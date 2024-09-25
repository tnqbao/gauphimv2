import React from "react";
// import { useRouter } from "next/router";



// const onFinish = () => async (values: FieldType) => {
//   console.log("Success:" + values.username );
//   alert("Login success" + values.username);
//     try {
//       const response = await fetch("https://gauapi.daudoo.com/api/user/login", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(values),
//       });

//       if (!response.ok) {
//         throw new Error("Network response was not ok");
//       }
//       const data = await response.json();
//       console.log("Response data:", data);

//       localStorage.setItem("token", data.token);
//     } catch (error) {
//       console.error("Error:", error);
//     }
// };

// const onFinishFailed = (errorInfo: any) => {
//   console.log("Failed:", errorInfo);
// };

const Register: React.FC = () => {
  // const router = useRouter();

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex flex-1 justify-center items-center">
        Register Form
        </div>
    </div>
  );
};

export default Register;
