import './App.css';
import Navbar from './components/Navbar';
import 'react-modern-calendar-datepicker/lib/DatePicker.css';
import { Calendar } from 'react-modern-calendar-datepicker';
import { Component } from 'react';
import events from './events.json';

class App extends Component {
  constructor() {
    super();
    this.state = {
      selectedDay: null,
      events: []
    }
    this.updateSelectionDay = this.updateSelectionDay.bind(this)
  }

  updateSelectionDay(selectedDay) {
    if (this.state.selectedDay === selectedDay) return;
    // get new events
    const date = `${selectedDay.day}/${selectedDay.month}/${selectedDay.year}`;
    const newEvents = events[date] || [];
    this.setState({
      selectedDay,
      events: newEvents
    })
  }

  render() {
    const { selectedDay, events } = this.state;

    console.log(selectedDay);

    return (
      <div>
        <Navbar />
        <div className='container mx-auto p-5'>
          {/* create calander selector */}
          <div className='md:flex'>
            <div className='flex'>
              <div className='mx-auto'>

                <Calendar
                  value={selectedDay}
                  onChange={this.updateSelectionDay}
                  shouldHighlightWeekends
                />
              </div>
            </div>
            <div className='md:ml-5 md:my-0 my-10 w-full'>
              {selectedDay === null
                ? 'Select a day'
                : (events.length === 0
                  ? 'No Events for the day'
                  : <div>
                    {events.map((event, i) => <div key={i} className='m-4 border-black border-2 rounded-lg p-4'>
                      <h3>{event.title}</h3>
                      <p>{event.time}</p>
                      {event.medium !== 'Unknown' && <p>On {event.medium}</p>}
                    </div>)}
                  </div>)}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
