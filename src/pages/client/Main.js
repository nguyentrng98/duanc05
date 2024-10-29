import { Outlet } from "react-router-dom";
import Sidebar from "../../components/partial/Sidebar";

export function Main() {
    return (
        <div className="w-full flex">
            <Sidebar />
            <div className=" w-5/6 px-40 pt-5">
                <Outlet />
            </div>
        </div>
    )

}