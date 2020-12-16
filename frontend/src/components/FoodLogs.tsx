import { useState, useEffect } from 'react'
import { useAppContext } from '../libs/context'
import { onError } from '../libs/error'
import ListGroup from "react-bootstrap/ListGroup";
import Link from 'next/link'
import { API } from 'aws-amplify'
import Router from 'next/router'
import { Loading } from './Loading'

import { BsPencilSquare } from "react-icons/bs";

export const FoodLogs = () => {
  const [logs, setLogs] = useState([]);
  const { loggedIn } = useAppContext();
  const [isLoading, setIsLoading] = useState(true);

  const renderLogsList = (logs) => {
    const { items } = logs
    return (
      <>
        <Link href="/logs/new">
          <ListGroup.Item action className="py-3 text-nowrap text-truncate">
            <BsPencilSquare size={17} />
            <span className="ml-2 font-weight-bold">Create a new food log</span>
          </ListGroup.Item>
        </Link>
        {items.length > 0 ? items.map(({ foodLogId, name, createdAt }) => (
          <Link key={foodLogId} href={`/logs/${foodLogId}`}>
            <ListGroup.Item action>
              <span className="font-weight-bold">
                {name.trim().split("\n")[0]}
              </span>
              <br />
              <span className="text-muted">
                Created: {new Date(createdAt).toLocaleString()}
              </span>
            </ListGroup.Item>
          </Link>
        )) : <h3 className='text-center mt-5'>You have no food logs.</h3>}
      </>
    );
  }

  useEffect(() => {
    async function onLoad() {
      if (!loggedIn) {
        Router.push('/')
        return;
      }

      try {
        const logs = await loadNotes();
        setLogs(logs);
      } catch (e) {
        onError(e);
      }

      setIsLoading(false);
    }

    onLoad();
  }, [loggedIn]);

  function loadNotes() {
    return API.get("logs", 'logs', '');
  }


  return (
    <div className="container">
      <h2 className="pb-3 mt-4 mb-3 border-bottom">Logs</h2>
      {isLoading ? <Loading /> : <ListGroup>{renderLogsList(logs)}</ListGroup>}
    </div>
  )

}