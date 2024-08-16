export default function UnauthenticatedHandle() {
  return {
    reloadPageUnauthenticated(error) {
      if (error.response.status == 401) {
        alert('You are not authenticated. Please login.');
        window.location.reload()
      }
    }
  }
}