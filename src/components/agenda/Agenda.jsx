import {getTimeToTitle} from '../../utils/utils.js';

import c from './Agenda.module.css';

const Agenda = ({date, agendaList}) => {
  return (
    <div className={c.root}>
      <h3><time>{date}</time></h3>
      <ul className={c.meetingList}>
          {
            agendaList.map(item => {
              const speakersStr = (item.speakers && item.speakers.length !== 0)
                ? '(' + item.speakers.reduce((str,current) => (str + current.name + ', '), '').slice(0, -2) + ')' : '';

              return (
                <li className={c.meetingItem} key={item.id}>
                  <div className={c.timeBlock}>
                    <div className={c.timeBlockInnerWrapper}>
                      <time className={c.timeCol}>{getTimeToTitle(item.startTime)}</time>
                      <time className={c.timeCol}>{getTimeToTitle(item.endTime)}</time>
                    </div>
                  </div>
                  <p className={c.description}>{item.name} {speakersStr}</p>
                </li>
              );            
            })
          }
      </ul>
    </div>
  );
};

export default Agenda;
