import { Menu, Transition } from '@headlessui/react'
import { DotsVerticalIcon } from '@heroicons/react/outline'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/solid'
import {
  add,
  eachDayOfInterval,
  endOfMonth,
  format,
  getDay,
  isEqual,
  isSameDay,
  isSameMonth,
  isToday,
  parse,
  parseISO,
  startOfToday,
} from 'date-fns'
import { Fragment, useState } from 'react'

const initialMeetings = [
  // July Meetings
  {
    id: 1,
    name: 'Project Planning',
    description: 'Initial planning for the new project.',
    imageUrl:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    startDatetime: '2024-07-11T10:00',
    endDatetime: '2024-07-11T11:30',
    type: 'work'
  },
  {
    id: 2,
    name: 'Team Outing',
    description: 'Fun day out with the team.',
    imageUrl:
      'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    startDatetime: '2024-07-15T12:00',
    endDatetime: '2024-07-15T16:00',
    type: 'personal'
  },
  {
    id: 3,
    name: 'Client Presentation',
    description: 'Presenting the project progress to the client.',
    imageUrl:
      'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    startDatetime: '2024-07-20T14:00',
    endDatetime: '2024-07-20T15:30',
    type: 'work'
  },
  {
    id: 4,
    name: 'Personal Day',
    description: 'Taking a day off for personal errands.',
    imageUrl:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    startDatetime: '2024-07-25T09:00',
    endDatetime: '2024-07-25T17:00',
    type: 'personal'
  },
  {
    id: 5,
    name: 'Office Party',
    description: 'Annual office party for all employees.',
    imageUrl:
      'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    startDatetime: '2024-07-30T18:00',
    endDatetime: '2024-07-30T21:00',
    type: 'other'
  },

  // August Meetings
  {
    id: 6,
    name: 'Team Meeting',
    description: 'Weekly team meeting to discuss progress.',
    imageUrl:
      'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    startDatetime: '2024-08-02T09:00',
    endDatetime: '2024-08-02T10:00',
    type: 'work'
  },
  {
    id: 7,
    name: 'Family Gathering',
    description: 'Get together with family members.',
    imageUrl:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    startDatetime: '2024-08-05T18:00',
    endDatetime: '2024-08-05T20:00',
    type: 'personal'
  },
  {
    id: 8,
    name: 'Workshop',
    description: 'Attending a workshop on new technologies.',
    imageUrl:
      'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    startDatetime: '2024-08-08T14:00',
    endDatetime: '2024-08-08T16:00',
    type: 'work'
  },
  {
    id: 9,
    name: 'Friend\'s Wedding',
    description: 'Attending a friend\'s wedding ceremony.',
    imageUrl:
      'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    startDatetime: '2024-08-12T11:00',
    endDatetime: '2024-08-12T15:00',
    type: 'personal'
  },
  {
    id: 10,
    name: 'Doctor Appointment',
    description: 'Routine check-up with the doctor.',
    imageUrl:
      'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    startDatetime: '2024-08-15T09:00',
    endDatetime: '2024-08-15T10:00',
    type: 'personal'
  },
  {
    id: 11,
    name: 'Client Review',
    description: 'Client review of the final project deliverables.',
    imageUrl:
      'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    startDatetime: '2024-08-19T14:00',
    endDatetime: '2024-08-19T15:30',
    type: 'work'
  },
  {
    id: 12,
    name: 'Networking Event',
    description: 'Attend a networking event with industry peers.',
    imageUrl:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    startDatetime: '2024-08-22T17:00',
    endDatetime: '2024-08-22T19:00',
    type: 'other'
  },
  {
    id: 13,
    name: 'Team Building Activity',
    description: 'Engage in a team-building activity with colleagues.',
    imageUrl:
      'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    startDatetime: '2024-08-27T10:00',
    endDatetime: '2024-08-27T12:00',
    type: 'work'
  },

  // September Meetings
  {
    id: 14,
    name: 'Strategy Meeting',
    description: 'Discuss strategies for the upcoming quarter.',
    imageUrl:
      'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    startDatetime: '2024-09-01T09:00',
    endDatetime: '2024-09-01T10:30',
    type: 'work'
  },
  {
    id: 15,
    name: 'Birthday Celebration',
    description: 'Celebrate a colleague\'s birthday.',
    imageUrl:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    startDatetime: '2024-09-05T13:00',
    endDatetime: '2024-09-05T14:00',
    type: 'personal'
  },
  {
    id: 16,
    name: 'Conference',
    description: 'Attend an industry conference.',
    imageUrl:
      'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    startDatetime: '2024-09-10T09:00',
    endDatetime: '2024-09-10T17:00',
    type: 'work'
  },
  {
    id: 17,
    name: 'Charity Event',
    description: 'Participate in a charity event.',
    imageUrl:
      'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    startDatetime: '2024-09-15T10:00',
    endDatetime: '2024-09-15T14:00',
    type: 'other'
  },
  {
    id: 18,
    name: 'Family Vacation',
    description: 'Taking a vacation with the family.',
    imageUrl:
      'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    startDatetime: '2024-09-20T08:00',
    endDatetime: '2024-09-25T18:00',
    type: 'personal'
  },

  // October Meetings
  {
    id: 19,
    name: 'Quarterly Review',
    description: 'Review the progress for the quarter.',
    imageUrl:
      'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    startDatetime: '2024-10-02T09:00',
    endDatetime: '2024-10-02T11:00',
    type: 'work'
  },
  {
    id: 20,
    name: 'Halloween Party',
    description: 'Annual Halloween party for the office.',
    imageUrl:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    startDatetime: '2024-10-31T18:00',
    endDatetime: '2024-10-31T22:00',
    type: 'other'
  }
];


const colStartClasses = [
  '',           // Placeholder for the first column
  'col-start-2', // Monday starts on the second column
  'col-start-3',
  'col-start-4',
  'col-start-5',
  'col-start-6',
  'col-start-7',
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Example() {
  let today = startOfToday()
  let [selectedDay, setSelectedDay] = useState(today)
  let [currentMonth, setCurrentMonth] = useState(format(today, 'MMM-yyyy'))
  let firstDayCurrentMonth = parse(currentMonth, 'MMM-yyyy', new Date())
  let [meetings, setMeetings] = useState(initialMeetings)
  // let [meetings, setMeetings] = useState([])
  let [isAddingEvent, setIsAddingEvent] = useState(false)
  const [selectedFilter, setSelectedFilter] = useState('all');


  const [editingEvent, setEditingEvent] = useState(null);
  const [editForm, setEditForm] = useState({
    name: '',
    description: '',
    startDatetime: '',
    endDatetime: '',
    type: 'personal',
  });


  let days = eachDayOfInterval({
    start: firstDayCurrentMonth,
    end: endOfMonth(firstDayCurrentMonth),
  })

  function previousMonth() {
    let firstDayNextMonth = add(firstDayCurrentMonth, { months: -1 })
    setCurrentMonth(format(firstDayNextMonth, 'MMM-yyyy'))
  }

  function nextMonth() {
    let firstDayNextMonth = add(firstDayCurrentMonth, { months: 1 })
    setCurrentMonth(format(firstDayNextMonth, 'MMM-yyyy'))
  }

  let selectedDayMeetings = meetings.filter((meeting) =>
    isSameDay(parseISO(meeting.startDatetime), selectedDay)
  )

  function handleSaveEvent() {
  if (editingEvent) {
    // Update existing event
    setMeetings(meetings.map((meeting) =>
      meeting.id === editingEvent.id
        ? { ...meeting, ...editForm, id: editingEvent.id }
        : meeting
    ));
    setEditingEvent(null);
  } else {
    // Add new event
    const newMeeting = {
      id: meetings.length + 1,
      name: editForm.name,
      description: editForm.description,
      startDatetime: editForm.startDatetime,
      endDatetime: editForm.endDatetime,
      type: editForm.type,
      imageUrl:
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    };
    setMeetings([...meetings, newMeeting]);
  }
  setIsAddingEvent(false);
  setEditForm({
    name: '',
    description: '',
    startDatetime: '',
    endDatetime: '',
    type: 'personal',
  });
}


  function handleDeleteEvent(id) {
    setMeetings(meetings.filter((meeting) => meeting.id !== id));
  }


  // Adding a header
  // const CalendarHeader = () => (
  //   <header className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-6 px-8 shadow-lg rounded-lg mb-6">
  //     <div className="flex items-center justify-between">
  //       <div>
  //         <h1 className="text-4xl font-bold tracking-wide">Event Calendar</h1>
  //         <p className="text-lg font-light mt-1">Stay organized with your work and personal events</p>
  //       </div>
  //     </div>
  //   </header>
  // );
    const CalendarHeader = () => (
    <header className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-6 px-4 sm:px-8 md:px-12 shadow-lg rounded-lg mb-6">
      <div className="flex flex-col md:flex-row items-center justify-between">
        <div className="text-center md:text-left">
          <h1 className="text-3xl md:text-4xl font-bold tracking-wide">Event Calendar</h1>
          <p className="text-base md:text-lg font-light mt-2">Stay organized with your work and personal events</p>
        </div>
      </div>
    </header>
  );


  return (
    <div className="pt-16 bg-custom-gradient">
      <div className="max-w-md px-4 mx-auto sm:px-7 md:max-w-4xl md:px-6">
        <CalendarHeader />
        <div className="md:grid md:grid-cols-2 md:divide-x md:divide-gray-200">
          <div className="md:pr-14">
            <div className="flex flex-wrap justify-center mb-4 gap-2">
              <button
                onClick={() => setSelectedFilter('all')}
                className={`px-5 py-2 rounded-full transition-all duration-300 ease-in-out 
                  ${selectedFilter === 'all' ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg transform scale-105' : 'bg-gray-200 hover:bg-gray-300 text-gray-700'}`}
              >
                All
              </button>
              <button
                onClick={() => setSelectedFilter('work')}
                className={`px-5 py-2 rounded-full transition-all duration-300 ease-in-out 
                  ${selectedFilter === 'work' ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg transform scale-105' : 'bg-gray-200 hover:bg-gray-300 text-gray-700'}`}
              >
                Work
              </button>
              <button
                onClick={() => setSelectedFilter('personal')}
                className={`px-5 py-2 rounded-full transition-all duration-300 ease-in-out 
                  ${selectedFilter === 'personal' ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg transform scale-105' : 'bg-gray-200 hover:bg-gray-300 text-gray-700'}`}
              >
                Personal
              </button>
              <button
                onClick={() => setSelectedFilter('other')}
                className={`px-5 py-2 rounded-full transition-all duration-300 ease-in-out 
                  ${selectedFilter === 'other' ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg transform scale-105' : 'bg-gray-200 hover:bg-gray-300 text-gray-700'}`}
              >
                Others
              </button>
            </div>

            <div className="flex items-center">
              <h2 className="flex-auto font-semibold ">
                {format(firstDayCurrentMonth, 'MMMM yyyy')}
              </h2>
              <button
                type="button"
                onClick={previousMonth}
                className="-my-1.5 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
              >
                <span className="sr-only">Previous month</span>
                <ChevronLeftIcon className="w-5 h-5" aria-hidden="true" />
              </button>
              <button
                onClick={nextMonth}
                type="button"
                className="-my-1.5 -mr-1.5 ml-2 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
              >
                <span className="sr-only">Next month</span>
                <ChevronRightIcon className="w-5 h-5" aria-hidden="true" />
              </button>
            </div>
            <div className="grid grid-cols-7 mt-10 text-xs leading-6 text-center text-gray-500">
              <div>S</div>
              <div>M</div>
              <div>T</div>
              <div>W</div>
              <div>T</div>
              <div>F</div>
              <div>S</div>
            </div>
            
            <div className="grid grid-cols-7 mt-2 text-sm">
              
              {days.map((day, dayIdx) => (
                
                <div
                  key={day.toString()}
                  className={classNames(
                    dayIdx === 0 && colStartClasses[getDay(day)],
                    'py-1.5'
                  )}
                >
                  <div className="w-1 h-1 mx-auto mt-1">
                    {meetings
                      .filter((meeting) => selectedFilter === 'all' || meeting.type === selectedFilter)
                      .some((meeting) => isSameDay(parseISO(meeting.startDatetime), day)) && (
                      <div className="w-1 h-1 pb-1 rounded-full bg-sky-500"></div>
                    )}
                  </div>

                  <button
                    type="button"
                    onClick={() => setSelectedDay(day)}
                    className={classNames(
                      isEqual(day, selectedDay) && 'text-white',
                      !isEqual(day, selectedDay) &&
                        isToday(day) &&
                        'text-red-500',
                      !isEqual(day, selectedDay) &&
                        !isToday(day) &&
                        isSameMonth(day, firstDayCurrentMonth) &&
                        '',
                      !isEqual(day, selectedDay) &&
                        !isToday(day) &&
                        !isSameMonth(day, firstDayCurrentMonth) &&
                        'text-gray-400',
                      isEqual(day, selectedDay) && isToday(day) && 'bg-red-500',
                      isEqual(day, selectedDay) &&
                        !isToday(day) &&
                        'bg-gray-900',
                      !isEqual(day, selectedDay) && 'hover:bg-gray-700',
                      (isEqual(day, selectedDay) || isToday(day)) &&
                        'font-semibold',
                      'mx-auto flex mt-1 h-8 w-8 items-center justify-center rounded-full'
                    )}
                  >
                    <time dateTime={format(day, 'yyyy-MM-dd')}>
                      {format(day, 'd')}
                    </time>
                  </button>
                  
                  

                </div>
              ))}
            </div>
          </div>
          <section className="mt-12 md:mt-0 md:pl-14 bg-">
            <h2 className="font-semibold ">
              Schedule for{' '}
              <time dateTime={format(selectedDay, 'yyyy-MM-dd')}>
                {format(selectedDay, 'MMM dd, yyyy')}
              </time>
            </h2>
            <ol className="mt-4 space-y-1 text-sm leading-6 text-gray-500">
              {selectedDayMeetings.length > 0 ? (
                selectedDayMeetings.map((meeting) => (
                  <li
                    key={meeting.id}
                    className="relative flex space-x-6 bg-gray-200 p-4 shadow-md rounded-md"
                  >
                    <img
                      src={meeting.imageUrl}
                      alt=""
                      className="flex-none w-10 h-10 rounded-full"
                    />
                    <div className="flex-auto">
                      <h3 className="font-semibold ">
                        {meeting.name}
                      </h3>
                      <h4 className="font-semibold ">
                        {meeting.description}
                      </h4>
                      <p>
                        <time dateTime={meeting.startDatetime}>
                          {format(
                            parseISO(meeting.startDatetime),
                            'h:mm a'
                          )}
                        </time>{' '}
                        -{' '}
                        <time dateTime={meeting.endDatetime}>
                          {format(parseISO(meeting.endDatetime), 'h:mm a')}
                        </time>
                      </p>
                    </div>
                    <Menu as="div" className="relative flex-none">
                      <div>
                        <Menu.Button className="-m-2 flex items-center rounded-full p-2 text-gray-400 hover:text-gray-600">
                          <span className="sr-only">Open options</span>
                          <DotsVerticalIcon className="w-5 h-5" aria-hidden="true" />
                        </Menu.Button>
                      </div>
                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                      >
                        <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md border border-gray-800 bg-[#f0f4f8] shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                          <div className="py-1">
                          <Menu.Item>
                          {({ active }) => (
                            <button
                              onClick={() => {
                                setEditForm({
                                  name: meeting.name,
                                  description: meeting.description,
                                  startDatetime: meeting.startDatetime,
                                  endDatetime: meeting.endDatetime,
                                  type: meeting.type,
                                });
                                setEditingEvent(meeting);
                                setIsAddingEvent(true);
                              }}
                              className={classNames(
                                active ? 'bg-gray-300 ' : 'text-gray-700',
                                'block px-4 py-2 text-sm w-full text-left'
                              )}
                            >
                              Edit
                            </button>
                          )}
                        </Menu.Item>

                        <Menu.Item>
                          {({ active }) => (
                            <button
                              onClick={() => handleDeleteEvent(meeting.id)}
                              className={classNames(
                                active ? 'bg-gray-100 ' : 'text-gray-700',
                                'block px-4 py-2 text-sm w-full text-left'
                              )}
                            >
                              Delete
                            </button>
                          )}
                        </Menu.Item>

                        </div>
                        </Menu.Items>
                      </Transition>
                    </Menu>
                  </li>
                ))
              ) : (
                <p className="text-gray-500">No meetings for today.</p>
              )}
            </ol>
            <button
              onClick={() => setIsAddingEvent(true)}
              className="mt-6 w-full mb-5 flex items-center justify-center rounded-md border border-transparent bg-gradient-to-r from-blue-500 to-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Add Event
            </button>

          </section>
        </div>
      </div>

      {isAddingEvent && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75 transition-opacity">
          <div className="bg-[#f0f4f8] rounded-lg overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full">
            <div className="px-4 py-5 sm:px-6">
              <h3 className="text-lg leading-6 text-black font-medium ">Add a new event</h3>
            </div>
            <div className="px-4 py-5 sm:p-6">
              <div className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                    Event name
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    value={editForm.name}
                    onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                    className="mt-1 border block w-full shadow-sm sm:text-sm text-gray-900 border-gray-300 rounded-md"
                  />
                </div>

                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                    Event Description
                  </label>
                  <textarea
                    name="description"
                    id="description"
                    value={editForm.description}
                    onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                    className="mt-1 border block w-full shadow-sm sm:text-sm text-gray-900 border-gray-300 rounded-md"
                  />
                </div>

                <div>
                  <label htmlFor="startDatetime" className="block text-sm font-medium text-gray-700">
                    Start Date & Time
                  </label>
                  <input
                    type="datetime-local"
                    name="startDatetime"
                    id="startDatetime"
                    value={editForm.startDatetime}
                    onChange={(e) => setEditForm({ ...editForm, startDatetime: e.target.value })}
                    className="mt-1 border block w-full shadow-sm sm:text-sm text-gray-900 border-gray-300 rounded-md"
                  />
                </div>

                <div>
                  <label htmlFor="endDatetime" className="block text-sm font-medium text-gray-700">
                    End Date & Time
                  </label>
                  <input
                    type="datetime-local"
                    name="endDatetime"
                    id="endDatetime"
                    value={editForm.endDatetime}
                    onChange={(e) => setEditForm({ ...editForm, endDatetime: e.target.value })}
                    className="mt-1 border block w-full shadow-sm sm:text-sm text-gray-900 border-gray-300 rounded-md"
                  />
                </div>

                <div>
                  <label htmlFor="type" className="block text-sm font-medium text-gray-700">
                    Event Type
                  </label>
                  <select
                    name="type"
                    id="type"
                    value={editForm.type}
                    onChange={(e) => setEditForm({ ...editForm, type: e.target.value })}
                    className="mt-1 p-1 border block w-full text-gray-900 shadow-sm sm:text-sm border-gray-300 rounded-md"
                  >
                    <option className='text-gray-900' value="personal">Personal</option>
                    <option className='text-gray-900' value="work">Work</option>
                    <option className='text-gray-900' value="other">Other</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
              <button
                onClick={handleSaveEvent}
                className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm"
              >
                Save
              </button>

              <button
                onClick={() => setIsAddingEvent(false)}
                className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}


