import Image from "next/image";
import {Button, DepartmentCard, Header, SearchBar, BlurredDiv} from "@myorg/ui";

const userDepartmentName = "Department of Motor Traffic (DMT)";
export default function Services() {
  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen gap-16">
      <Header departmentName={userDepartmentName}></Header>

      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">

        <div className="flex flex-col gap-2 w-100">
          <SearchBar placeholder="Search for services..."></SearchBar>
        </div>
        <Button>Add New Department</Button>

      </main>
      
    </div>
  );
}
