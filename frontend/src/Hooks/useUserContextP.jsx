import { BiRightArrowAlt } from "react-icons/bi";
import { TiTick } from "react-icons/ti";
const Appoint = () => {
  return (
    <div>
      <div className="bg-red-500 h-96 mt-24 flex flex-col">
        <h1 className="text-[70px]  ml-9 mt-36 font-bold text-white">
          Appointments
        </h1>
      </div>
      <div className=" flex bg-gray-700">
        <div className=" w-96 h-[600px] bg-orange-500"></div>
        <div className="flex flex-col bg-green-500 w-[900px]">
          <h1 className="mt-7 ml-11 font-bold text-[55px] text-purple-900">
            Book An Appointment
          </h1>
          <p className="ml-11">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.{" "}
          </p>
          <div className="flex mt-9 gap-4">
            <div className="ml-11 flex flex-col">
              <h1>First Name</h1>
              <input
                type="text"
                name="fnmae"
                placeholder="First Name"
                className="h-[47px] w-96  border-2 block focus:outline-none focus:border-purple-300 bg-gray-50 focus:bg-white"
              />

              <h1>Phone</h1>
              <input
                type="text"
                name="phone"
                placeholder="Phone"
                className="h-[47px] w-96  border-2 block focus:outline-none focus:border-purple-300 bg-gray-50 focus:bg-white"
              />
              <h1>Date</h1>
              <input
                type="date"
                name="date"
                placeholder="Date"
                className="h-[47px] w-96  border-2 block focus:outline-none focus:border-purple-300 bg-gray-50 focus:bg-white"
              />
            </div>
            <div className=" flex flex-col">
              <h1>Last Name</h1>
              <input
                type="text"
                name="lnmae"
                placeholder="Last Name"
                className="h-[47px] w-96  border-2 block focus:outline-none focus:border-purple-300 bg-gray-50 focus:bg-white"
              />

              <h1>Email</h1>
              <input
                type="email"
                name="phone"
                placeholder="Phone"
                className="h-[47px] w-96  border-2 block focus:outline-none focus:border-purple-300 bg-gray-50 focus:bg-white"
              />
              <h1>Time</h1>
              <input
                type="time"
                name="time"
                placeholder="Date"
                className="h-[47px] w-96  border-2 block focus:outline-none focus:border-purple-300 bg-gray-50 focus:bg-white"
              />
            </div>
          </div>
          <div className="mt-5 ml-11 flex flex-col">
            <h1>Note</h1>
            <textarea
              placeholder="text"
              className=" border-2 focus:outline-none focus:border-purple-300 h-32 w-[783px]"
            ></textarea>
            <button className=" mt-4  bg-violet-700 h-[40px] w-[783px] text-white hover:bg-black">
              <div className="flex">
                <h5 className="ml-72 mt-1"> Book An Appointment</h5>{" "}
                <BiRightArrowAlt className="ml-1 mt-1 text-3xl" />
              </div>
            </button>
          </div>
        </div>
      </div>
      <div className="mt-28 bg-green-600 h-[600px] w-full flex flex-col">
        <div className="flex felx-col mt-40 ml-11 h-48 w-[620px]  ">
          <h1 className="text-[60px] text-white font-bold ">
            A healthier choice for a healthier you.
          </h1>
        </div>
        <div className="w-[700px]">
          <p className="ml-11 text-white">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit
            tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.
          </p>
        </div>
        <button className=" mt-8 ml-[45px] bg-violet-700 h-[56px] w-48 text-white">
          <div className="flex">
            <h5 className="ml-8 mt-1">Discover More</h5>{" "}
            <BiRightArrowAlt className="ml-1 mt-1 text-3xl" />
          </div>
        </button>
      </div>
      <div className="flex mt-11">
        <div className="flex  w-[700px] h-[800px] mt-28">
          <div className="flex flex-col ">
            <p className="text-[57px] ml-[65px] font-bold text-purple-900">
              A healthy life awaits you
            </p>
            <p className="ml-[65px] mt-3 text-gray-600">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit
              tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.
            </p>
            <div className="flex gap-20 ">
              <div className="grid gap-2 font-bold text-purple-900 ml-11 mt-11">
                <div className="flex">
                  <TiTick className="text-red-400 mr-3 text-2xl" />
                  Certified Expert
                </div>
                <div className="flex">
                  <TiTick className="text-red-400 mr-3 text-2xl" />
                  Professional & Experience
                </div>
                <div className="flex">
                  <TiTick className="text-red-400 mr-3 text-2xl" />
                  Smart Solutions
                </div>
                <div className="flex">
                  <TiTick className="text-red-400 mr-3 text-2xl" />
                  24/7 Support
                </div>
              </div>

              <div className="grid gap-2 font-bold text-violet-900 mt-11">
                <div className="flex">
                  <TiTick className="text-red-400 mr-3 text-2xl" />
                  Certified Expert
                </div>
                <div className="flex">
                  <TiTick className="text-red-400 mr-3 text-2xl" />
                  Professional & Experience
                </div>
                <div className="flex">
                  <TiTick className="text-red-400 mr-3 text-2xl" />
                  Smart Solutions
                </div>
                <div className="flex">
                  <TiTick className="text-red-400 mr-3 text-2xl" />
                  24/7 Support
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-yellow-300 ml-[60px] w-[600px] mt-20 h-[470px] ">
          pictures
        </div>
        <div className=" bg-white h-[150px] w-64 absolute mt-[430px] ml-[647px]">
          <h1 className="text-[75px] font-bold text-purple-900 ml-10 mt-3">
            5K+
          </h1>
          <h1 className="text-2xl  text-purple-900 ml-9 pb-11 font-bold ">
            Happy client
          </h1>
        </div>
      </div>
    </div>
  );
};

export default Appoint;
