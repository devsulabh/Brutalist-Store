import Form from "@/components/auth/form";

export default function SignUpPage() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "calc(100vh - 200px)",
        padding: "2rem",
      }}
    >
      <Form />
    </div>
  );
}