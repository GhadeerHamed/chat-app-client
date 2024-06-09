import {useParams} from "react-router-dom";
import {AppBar, Avatar, Box, Stack, TextField, Toolbar, Typography} from "@mui/material";
import MessageCard from "./MessageCard";
import {useMutation, useQuery, useSubscription} from "@apollo/client";
import {MESSAGES_BY_USER} from "../graphql/queries";
import {useState} from "react";
import {Send} from '@mui/icons-material'
import {SEND_MESSAGE} from "../graphql/mutations";
import {MSG_SUB} from "../graphql/subscriptions";

const ChatScreen = () => {
	const {id, name} = useParams()
	const [text, setText] = useState("")
	const [messages, setMessages] = useState([])
	const { loading} = useQuery(MESSAGES_BY_USER, {
			variables: {
				receiverId: +id // + sign to convert string to int
			},
			onCompleted(data) {
				setMessages(data.messagesByUser)
			}
		}
	)

	const [sendMessage] = useMutation(SEND_MESSAGE)

	useSubscription(MSG_SUB, {
		onData({data: {data}}) {
			setMessages((prev) => [...prev, data.messageAdded])
			setText("")
		}
	});

	return (
		<Box flexGrow={1}>
			<AppBar
				position={'static'}
				sx={{backgroundColor: "white", boxShadow: 0}}
			>
				<Toolbar>
					<Avatar
						src={`https://api.dicebear.com/8.x/initials/svg?seed=${name}`}
						sx={{width: "32px", height: "32px", mr: 2}}
						alt={'avatar'}
					/>
					<Typography variant='h6' color='black'>
						{name}
					</Typography>
				</Toolbar>
			</AppBar>
			<Box
				backgroundColor="#f5f5f5"
				height="80vh"
				padding='10px'
				overflow='auto'
			>
				{
					loading ?
						<Typography variant='h6'>Loading chat... </Typography>
						: messages.map(msg =>
							<MessageCard
								text={msg.text}
								date={msg.createdAt}
								direction={msg.receiverId === +id ? "end" : "start"}
							/>
						)
				}
			</Box>
			<Stack direction="row" justifyItems='center'>
				<TextField
					placeholder="Enter a message"
					variant='standard'
					fullWidth
					multiline
					rows={2}
					value={text}
					onChange={(e) => setText(e.target.value)}
				/>
				<Send
					fontSize="large"
					className="sendBtn"
					onClick={() =>
						sendMessage({
							variables: {
								input: {
									text,
									receiverId: +id
								}
							}
						})
					}
				/>
			</Stack>
		</Box>
	)
}

export default ChatScreen;