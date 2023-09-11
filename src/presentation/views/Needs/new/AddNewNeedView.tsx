import { AppNavBar } from "../../../AppNavBar"
import { AddNewNeedForm } from "./components/AddNewNeedForm"

export const AddNewNeedView = () => {
  return (
    <div>
        <AppNavBar/>
        <div className="flex flex-col justify-center items-center p-4 md:w-1/2 sm:w-full sm:mx-2 md:mx-auto overflow-scroll">
            <AddNewNeedForm/>
        </div>
    </div>
  )
}
