
 
import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Bars3Icon, CalendarIcon, HomeIcon, MagnifyingGlassCircleIcon, MapIcon, MegaphoneIcon, UserGroupIcon, XMarkIcon } from "@heroicons/react/24/outline";
import PieChart from "./PieChart";
import LineChart from "./LineChart";
import NumberLabelCard from "./NumberLabelCard";
import IconCards from "./IconCards";
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function DashboardUI({ navigation, user, aside }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [navList, setNavList] = useState(navigation);

  const setNewUI = (nav) => {
    const newList = navList.map((navIndex) => (navIndex.id === nav.id ? { ...nav, current: true } : { ...navIndex, current: false }));
    setNavList(newList);
    setSidebarOpen(false);
  };
  return (
    <>
      <div className="flex h-[100vh]">
        <Transition.Root
          show={sidebarOpen}
          as={Fragment}
        >
          <Dialog
            as="div"
            className="relative z-40 lg:hidden"
            onClose={setSidebarOpen}
          >
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-gray-600 bg-opacity-75" />
            </Transition.Child>

            <div className="fixed inset-0 z-40 flex">
              <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="-translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="-translate-x-full"
              >
                <Dialog.Panel className="relative flex w-full max-w-xs flex-1 flex-col bg-white focus:outline-none">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-in-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-300"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <div className="absolute top-0 right-0 -mr-12 pt-2">
                      <button
                        type="button"
                        className="ml-1 flex h-10 w-10 items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                        onClick={() => setSidebarOpen(false)}
                      >
                        <span className="sr-only">Close sidebar</span>
                        <XMarkIcon
                          className="h-6 w-6 text-white"
                          aria-hidden="true"
                        />
                      </button>
                    </div>
                  </Transition.Child>
                  <div className="h-0 flex-1  pt-5 pb-4">
                    <div className="flex flex-shrink-0 items-center px-4">
                      <img
                        className="h-8 w-auto"
                        src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                        alt="Your Company"
                      />
                    </div>
                    <nav
                      aria-label="Sidebar"
                      className="mt-5"
                    >
                      <div className="space-y-1 px-2">
                        {navList.map((item) => (
                          <a
                            key={item.name}
                            href={item.href}
                            className={classNames(
                              item.current ? "bg-gray-100 text-gray-900" : "text-gray-600 hover:bg-gray-50 hover:text-gray-900",
                              "group flex items-center px-2 py-2 text-base font-medium rounded-md"
                            )}
                            onClick={() => setNewUI(item)}
                          >
                            <item.icon
                              className={classNames(item.current ? "text-gray-500" : "text-gray-400 group-hover:text-gray-500", "mr-4 h-6 w-6")}
                              aria-hidden="true"
                            />
                            {item.name}
                          </a>
                        ))}
                      </div>
                    </nav>
                  </div>
                  <div className="flex flex-shrink-0 border-t border-gray-200 p-4">
                    <a
                      href="#"
                      className="group block flex-shrink-0"
                    >
                      <div className="flex items-center">
                        <div>
                          <img
                            className="inline-block h-10 w-10 rounded-full"
                            src="https://images.unsplash.com/photo-1517365830460-955ce3ccd263?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=256&h=256&q=80"
                            alt=""
                          />
                        </div>
                        <div>
                          <img
                            className="inline-block h-10 w-10 rounded-full"
                            src={user?.profileImg}
                            alt={"alt"}
                          />
                        </div>
                        <div className="ml-3">
                          <p className="text-base font-medium text-gray-700 group-hover:text-gray-900">{user?.username}</p>
                          <p className="text-sm font-medium text-gray-500 group-hover:text-gray-700">View profile</p>
                        </div>
                      </div>
                    </a>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
              <div
                className="w-14 flex-shrink-0"
                aria-hidden="true"
              >
                {/* Force sidebar to shrink to fit close icon */}
              </div>
            </div>
          </Dialog>
        </Transition.Root>

        {/* Static sidebar for desktop */}
        <div className="hidden lg:flex lg:flex-shrink-0">
          <div className="flex w-64 flex-col">
            {/* Sidebar component, swap this element with another sidebar if you like */}
            <div className="flex min-h-0 flex-1 flex-col border-r border-gray-200 bg-gray-100">
              <div className="flex flex-1 flex-col  pt-5 pb-4">
                {/* <div className="flex flex-shrink-0 items-center px-4">
                  <img
                    className="h-8 w-auto"
                    src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                    alt="Your Company"
                  />
                </div> */}
                <nav
                  className="mt-5 flex-1"
                  aria-label="Sidebar"
                >
                  <div className="space-y-1 px-2">
                    {navList.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className={classNames(
                          item.current ? "bg-gray-200 text-gray-900" : "text-gray-600 hover:bg-gray-50 hover:text-gray-900",
                          "group flex items-center px-2 py-2 text-sm font-medium rounded-md"
                        )}
                        onClick={() => setNewUI(item)}
                      >
                        <item.icon
                          className={classNames(item.current ? "text-gray-500" : "text-gray-400 group-hover:text-gray-500", "mr-3 h-6 w-6")}
                          aria-hidden="true"
                        />
                        {item.name}
                      </a>
                    ))}
                  </div>
                </nav>
              </div>
              <div className="flex flex-shrink-0 border-t border-gray-200 p-4">
                <a
                  href="#"
                  className="group block w-full flex-shrink-0"
                >
                  <div className="flex items-center">
                    <div>
                      <img
                        className="inline-block h-10 w-10 rounded-full"
                        src={user?.profileImg}
                        alt={"alt"}
                      />
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-700 group-hover:text-gray-900">{user?.username}</p>
                      <p className="text-xs font-medium text-gray-500 group-hover:text-gray-700">View profile</p>
                    </div>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="flex min-w-0 flex-1 flex-col ">
          <div className="lg:hidden">
            <div className="flex items-center justify-between border-b border-gray-200 bg-gray-50 px-4 py-1.5">
              <div>
                <img
                  className="h-8 w-auto"
                  src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                  alt="Your Company"
                />
              </div>
              <div>
                <button
                  type="button"
                  className="-mr-3 inline-flex h-12 w-12 items-center justify-center rounded-md text-gray-500 hover:text-gray-900"
                  onClick={() => setSidebarOpen(true)}
                >
                  <span className="sr-only">Open sidebar</span>
                  <Bars3Icon
                    className="h-6 w-6"
                    aria-hidden="true"
                  />
                </button>
              </div>
            </div>
          </div>
          <div className="relative z-0 flex flex-1 ">
            <main className="relative z-0 flex-1  focus:outline-none">
              {/* Start main area*/}
              <div className="absolute inset-0 py-6 px-4 sm:px-6 lg:px-8">
                {/* <div className="h-full rounded-lg border-2 border-dashed border-gray-200"> */}
                <div className="h-full rounded-lg ">
                  {navList?.map((nav) => (nav.current ? nav.mainComponent : null)) || ""}
                  <PieChart
                    series={[44, 55, 41, 17, 15]}
                    labels={["A", "B", "C", "D", "E"]}
                  />{" "}
                  <LineChart
                    options={{
                      chart: {
                        id: "basic-bar"
                      }
                    }}
                    categories={[1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998]}
                    series={[
                      {
                        name: "Series-1",
                        data: [30, 40, 45, 50, 49, 60, 70, 91]
                      }
                    ]}
                  />
                  <NumberLabelCard
                    data={[
                      {
                        name: "Jane Cooper",
                        title: "Regional Paradigm Technician",
                        role: "Admin",
                        email: "janecooper@example.com",
                        telephone: "+1-202-555-0170",
                        imageUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60"
                      }
                    ]}
                  />
                  <IconCards
                    projects={[
                      { name: "Graph API", initials: "GA", href: "#", members: 16, bgColor: "bg-pink-600" }
                      //   { name: "Component Design", initials: "CD", href: "#", members: 12, bgColor: "bg-purple-600" },
                      //   { name: "Templates", initials: "T", href: "#", members: 16, bgColor: "bg-yellow-500" },
                      //   { name: "React Components", initials: "RC", href: "#", members: 8, bgColor: "bg-green-500" }
                    ]}
                  />
                </div>
              </div>
              {/* End main area */}
            </main>
            {aside ? (
              <aside className="relative hidden w-96 flex-shrink-0  border-l border-gray-200 xl:flex xl:flex-col">
                {/* Start secondary column (hidden on smaller screens) */}
                <div className="absolute inset-0 py-6 px-4 sm:px-6 lg:px-8">
                  <div className="h-full rounded-lg border-2 border-dashed border-gray-200">{navList?.map((nav) => (nav.current ? nav.asideComponent : null)) || ""}</div>
                </div>
                {/* End secondary column */}
              </aside>
            ) : null}
          </div>
        </div>
      </div>
    </>
  );
}
