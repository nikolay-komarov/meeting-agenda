import {useEffect, useState} from "react";

import Agenda from '../../components/agenda/Agenda.jsx';

import {getDateToTitle} from '../../utils/utils.js';

import c from './App.module.css';

function App() {
  const [areas, setAreas] = useState();
  const [agenda, setAgenda] = useState();

  useEffect(() => {
    const load = async () => {
      const areasData = await fetch ('https://dev.powerplace.online/api/v1/test/areas')
        .then(res => res.json());
      const agendaData = await fetch ('https://dev.powerplace.online/api/v1/test/agenda')
        .then(res => res.json());

      setAreas(areasData);
      setAgenda(agendaData);
    };

    load();
  }, []);

  const getUniqDateByArea = (area, agenda) => {
    return areas.map(area => {
      const uniqDateSet = new Set(agenda[area.id].map(item => {
        const date = new Date(item.startTime).toDateString();
        
        return date;
      }));

      return {
        areaId: area.id,
        dates: Array.from(uniqDateSet),
      }
    });
  };

  return (
    <div className={c.root}>
      <h1 className={c.title}>Расписание</h1>
      {
        (!areas || !agenda)
        ? <p>Loading...</p>
        : <section className={c.areasList}>
            {
              areas.map(area => (
                <div key={area.id}>
                  <h2>Комната "{area.title}"</h2>
                  {
                    getUniqDateByArea(area, agenda)
                      .find(item => item.areaId === area.id)
                      .dates.map(date => {
                        return (
                          <Agenda key={date}
                            date={getDateToTitle(date)}
                            agendaList={agenda[area.id].filter(rec => (new Date(rec.startTime)).toDateString() === date)}
                          />
                        )
                      }
                    )
                  }
                </div>
              ))
            }
          </section>
      }
    </div>
  );
}

export default App;
