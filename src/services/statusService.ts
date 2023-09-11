

export const getStatusColor = (status: string ) => {
    return status === "waiting" ? "gray" : status === "pending" ? "orange" : status === "validated" ? "green" : "gray"
  }

  export const getStatusText = (status: string ) => {
    return status === "waiting" ? "En attente" : status === "pending" ? "En cours" : status === "validated" ? "Terminé" : ""
  }