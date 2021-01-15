import React from "react";

const ProfileCard = (props) => {
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <div className='col-md-6'>
        <div className='box box-primary'>
          <div className='box-body box-profile text-center'>{props.children}</div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
