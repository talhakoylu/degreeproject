import {useRouter} from "next/router";

const DashboardQuizIndex = () => {
    const router = useRouter();
    const {id} = router.query
    return(
        <>
            {console.log(id)}
        </>
    )
}

export default DashboardQuizIndex