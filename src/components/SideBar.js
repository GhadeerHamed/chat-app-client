import {Alert, Box, Divider, Stack, Typography} from "@mui/material";
import UserCard from "./UserCard";
import {Logout} from "@mui/icons-material";
import {useQuery} from "@apollo/client";
import {GET_USERS} from "../graphql/queries";


const SideBar = ({setLoggedIn}) => {

	const {loading, data, error} = useQuery(GET_USERS)

	if (loading) return <Typography variant='h6'>Loading chats...</Typography>

	if (error) return <Alert severity='error'> {error.message} </Alert>

	return (
		<Box
			backgroundColor={'#f7f7f7'}
			height={'95vh'}
			width={"250px"}
			padding={'10px'}
			paddingBottom={'0px'}
		>
			<Stack direction="row" justifyContent="space-between">
				<Typography variant='h6'> Chat </Typography>
				<Logout
					className="logoutIcon"
					onClick={() => {
						localStorage.removeItem("jwt")
						setLoggedIn(false)
					}}
				/>
			</Stack>
			<Divider/>
			{
				data.users.map((user) => <UserCard key={user.id} item={user}/>)
			}
		</Box>
	)
}

export default SideBar