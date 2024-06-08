import {Stack, Avatar, Typography} from "@mui/material";
import {useNavigate} from "react-router-dom";


const UserCard = ({item: {id, firstName, lastName}}) => {
	const navigate = useNavigate()
	return (
		<Stack
			direction="row"
			spacing={2} sx={{py: 1}}
			className={"usercard"}
			onClick={() => navigate(`/${id}/${firstName} ${lastName}`)}
		>
			<Avatar
				src={`https://api.dicebear.com/8.x/initials/svg?seed=${firstName} ${lastName}`}
				sx={{width:"32px", height:"32px"}}
				alt={'avatar'}
			/>
			<Typography variant="subtitle2">{firstName} {lastName}</Typography>
		</Stack>
	)
}
export default UserCard