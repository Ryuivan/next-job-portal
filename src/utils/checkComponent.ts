export const checkComponent = () => {
  if (typeof window === "undefined") {
    console.log("Server-side");
  } else {
    console.log("Client-side");
  }
};
