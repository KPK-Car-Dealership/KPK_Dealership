import { useAuth0 } from "@auth0/auth0-react";

function LogoutButton() {

    const { logout, isAuthenticated } = useAuth0();

    return (
        isAuthenticated && (
            <button onClick={() => logout()}>
                Log out
            </button>
        )

    )
}

export default LogoutButton