function Page404() {
  return (
    <div
      style={{
        backgroundColor: "#fff",
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "10vh",
        width: "20vw",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <pre
        style={{
          color: "#000",
          textShadow: "2px 2px 4px #000",
          fontSize: "16px",
          textAlign: "center",
        }}
      >
        {`

         Error! Page not Found!                    
`}
      </pre>
    </div>
  );
}

export default Page404;
