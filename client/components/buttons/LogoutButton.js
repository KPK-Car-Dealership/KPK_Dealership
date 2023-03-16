function LogoutButton({ setToken, setCarsList, setLoading }) {
  function logoutUser() {
    localStorage.removeItem("token");
    setToken(null);
    setCarsList(null);
    setLoading(false);
  }
  return (
    <button
      className="btn btn-outline-danger mx-2 px-2"
      onClick={() => logoutUser()}
    >
      Logout
    </button>
  );
}

export default LogoutButton;
