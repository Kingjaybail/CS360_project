import React from "react"
import routed_connectors from "../components/Connector/connector"

export default function home() {
  return (
    <div>
      <p>Home Page</p>
      <button
        onClick={() => routed_connectors.testConnector()}
      >
        Sample
        </button>
        
      <button
        onClick={() => routed_connectors.get_book_info("The lord of the rings")}
      > 

        Get book information 
      </button>
    </div>
  )
}