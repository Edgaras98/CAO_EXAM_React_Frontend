import React from "react";

const DataProfile = ({ name, surname, email, phone }) => {
  return (
    <div className="profile-div">
      <h2>
        Vardas: <span>{name}</span>
      </h2>
      <h2>
        Pavardė: <span>{surname}</span>
      </h2>
      <h2>
        El.paštas: <span>{email}</span>
      </h2>
      <h2>
        Telefono numeris: <span>{phone}</span>
      </h2>
    </div>
  );
};

export default DataProfile;
