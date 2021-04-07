import {useEffect, useState} from "react";

import Agenda from '../../components/agenda/Agenda.jsx';

import {getDateToTitle} from '../../utils/utils.js';

import c from './App.module.css';

// todo: удалить моковые данные после подключения запроса с сервера
import AREAS from '../../mocks/areas.js';
import AGENDA from '../../mocks/agenda.js';

function App() {
  const [areas, setAreas] = useState();
  const [agenda, setAgenda] = useState();

  useEffect(() => {
    const load = () => {
      // todo: переписать на запрос с сервера после решения вопроса с CORS на сервере
      setAreas(AREAS);
      setAgenda(AGENDA);
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
