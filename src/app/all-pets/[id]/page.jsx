import PetDetailsForm from "./PetDetailsForm";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

const PetDetailsPage = async ({ params }) => {
  const { id } = await params;
  const {token} = await auth.api.getToken({
    headers: await headers()
  })
  

   const session = await auth.api.getSession({
    headers: await headers()
  });
  
  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/add-pet/${id}`,{
    headers: {
      authorization: `Bearer ${token}`
    }
  }
  
    
  );
  
if (!res.ok) {
  return <div className="p-10 font-black">Unauthorized 🔒</div>;
}
const pet = await res.json();
 

  if (!pet) return <div className="p-10 text-center font-black">Pet not found.</div>;

  return (
    <div className="min-h-screen bg-[#f9f3eb]">
      <PetDetailsForm pet={pet} user={session?.user} />
    </div>
  );
};

export default PetDetailsPage;