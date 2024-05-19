import { Link } from "react-router-dom";

function PageNotFound() {
  return (
    <div className="h-screen bg-white flex justify-center items-center">
      <div className="text-center relative">
        <h1 className="text-8xl font-bold animate-bounce">404</h1>
        <h3 className="text-2xl">Sorry! This page is not found.</h3>
        <Link to="/app">
          <button className="pt-2 pb-2 pl-4 pr-4 bg-black text-white rounded-lg hover:-translate-y-1 mt-8 active:translate-y-1">
            Go to home page
          </button>
        </Link>
        <span className="ti-arrow-right ti text-4xl absolute bottom-0 left-0 moveRightAndBackAnimation"></span>
      </div>
    </div>
  );
}

export default PageNotFound;
