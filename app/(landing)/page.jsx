import  Link  from "next/link";

const LandingPage = () => {
    return(
        <div>
            landing page 
            <div>
                <Link  href="/sign-in">
                    <button>Login</button>
                </Link>
                <Link  href="/sign-up" >
                    <button>register</button>
                </Link>
            </div>
        </div>
    )
}

export default LandingPage;