import Link from "next/link";

const Basichome: React.FC = () => {
    
    return (
        <div>
        <h1 className="text-2xl font-bold">Welcome to the Home Page!</h1>
        <p className="mt-4">
          Please <Link href="/login">login</Link> or{" "}
          <Link href="/register">register</Link> to access your account.
        </p>
      </div>
    );
  };

  export default Basichome;