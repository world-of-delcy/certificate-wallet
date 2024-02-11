import loading_animation from "../../Assets/loading_animation.svg";
function Loading() {
  return (
    <>
      <div className="fixed top-0 left-0 min-h-screen min-w-full bg-black opacity-50"></div>
      <div className="fixed top-0 left-0 min-h-screen min-w-full flex justify-center items-center">
        <img src={loading_animation} alt="Loading" />
      </div>
    </>
  );
}

export default Loading;
