import AuthForm from "@/components/AuthForm";
import connectDB from "@/lib/config/connectDB";


export default async function Home() {

  await connectDB();

  return (
    <div>
        ConnectDB
        <AuthForm/>
    </div>
  );
}