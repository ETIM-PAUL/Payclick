
    import { useState } from "react";
// import { formatDate } from '@fullcalendar/core'
import '@fullcalendar/react/dist/vdom';
import FullCalendar, { formatDate } from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import { Modal } from 'Components/Modal/Modal';
import  ModalPrompt from 'Components/Modal/ModalPrompt';
import "./calendar.css"


const Calendar = ({defaulEvents, setEvents, isCalendarFullWidth = true}) => {
  const [currentEvents, setCurrentEvents] = useState([]);
  const [showAddEventmodal, setShowAddEventmodal] = useState(false);
  const [showDeleteEventmodal, setShowDeleteEventmodal] = useState(false);
  const [newEventName, setNewEventName] = useState('');
  const [currentSelectedDate, setCurrentSelectedDate] = useState();
  const [currentSelectedEvent, setCurrentSelectedEvent] = useState();

  const handleDateClick = (selected) => {
    setShowAddEventmodal(true)
    setCurrentSelectedDate(selected)
    // console.log(selected)
  };


  const handleEventsSet = (events) => {
    setCurrentEvents(events)
    if(setEvents){
        setEvents(events)
    }
  };

  const handleAddModalSubmit = () =>{
    const calendarApi = currentSelectedDate.view.calendar;
    calendarApi.unselect();
    
    if (newEventName) {
      setShowAddEventmodal(false)
      calendarApi.addEvent({
        id: `${currentSelectedDate.dateStr}-${newEventName}`,
        title: newEventName,
        start: currentSelectedDate.startStr,
        end: currentSelectedDate.endStr,
        allDay: currentSelectedDate.allDay,
      });
    }
    setNewEventName('')

  }

  const handleEventClick = (selected) => {
    // console.log(selected)
    setCurrentSelectedEvent(selected)
    setShowDeleteEventmodal(true)
  };

  const handleDeletEventClick = () => {
    currentSelectedEvent.event.remove()
    setShowDeleteEventmodal(false)
  };

  

  return (
    <>
    
    <div className="m-5">
      <div className="flex justify-center items-center">
        {/* CALENDAR SIDEBAR */}
        <div className="flex-col w-[15%] p-4 rounded-md bg-slate-100">
          <h5>Events</h5>
          <ul className="space-y-2 mt-2 rounded-md text-center">
            {currentEvents.map((event) => (
              <li
                key={event.id}
                className="mx-3 rounded-md bg-slate-300 border text-slate-500 font-medium hover:border-slate-100 hover:shadow p-4"
              >
                <div>
                    <div>
                        {event.title}
                    </div>
                    <p>
                      {formatDate(event.start, {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* CALENDAR */}
        <div className={`flex w-[85%] ml-4 ${isCalendarFullWidth ? 'calendar-full-width' : ''}`}>
          <FullCalendar
            height="500px"
            // aspectRatio={5}
            viewHeight={"200px"}
            eventBorderColor="purple"
            eventBackgroundColor="purple"
            plugins={[
              dayGridPlugin,
              timeGridPlugin,
              interactionPlugin,
              listPlugin,
            ]}
            headerToolbar={{
              left: "prev,next today",
              center: "title",
              right: "dayGridMonth,timeGridWeek,timeGridDay,listMonth",
            }}
            initialView="dayGridMonth"
            editable={true}
            selectable={true}
            selectMirror={true}
            dayMaxEvents={true}
            select={handleDateClick}
            eventClick={handleEventClick}
            eventsSet={(events) => handleEventsSet(events)}
            initialEvents={defaulEvents}
          />
        </div>
      </div>
    </div>

        <Modal
          title={"Add Event"}
          isOpen={showAddEventmodal}
          modalCloseClick={() => setShowAddEventmodal(false)}
          modalHeader={true}
          classes={'w-1/2 '}
        >
          <div className="flex flex-col flex-wrap justify-center items-center">
            <input className="mb-3" type="text" name="addEvent" value={newEventName} onChange={(e)=> setNewEventName(e.target.value)} />
            <button className="p-4 bg-slate-800 text-white rounded-md" onClick={handleAddModalSubmit}>Add</button>
          </div>
        </Modal>

        {
            showDeleteEventmodal &&
            <ModalPrompt
                closeModalFunction={()=>{setShowDeleteEventmodal(false)}}
                message="Are you sure you want to delete this event?"
                title = "Delete Event"
                loading = {false}
                actionHandler={handleDeletEventClick}
            />
        }
    </>
  );
};

export default Calendar;
    