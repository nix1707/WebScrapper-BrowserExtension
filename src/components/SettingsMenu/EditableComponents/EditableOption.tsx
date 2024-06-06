import { useState } from 'react'
import Dropdown from '../../Dropdown/Dropdown';
import { ParseMethod } from '../../../models/ParseMethod';

interface Props {
  onEditing: (id: number) => void;
  defaultId: number;
}

const EditableOption = ({ onEditing, defaultId }: Props) => {
  const [isEditing, setIsEditing] = useState(false);
  const [optionId, setOptionId] = useState(defaultId);

  const handleClick = () => {
    setIsEditing(true);
  };

  const handleBlur = () => {
    setIsEditing(false);
  };

  return (
    <div>
      {isEditing ? (
        <Dropdown
          onBlur={handleBlur}
          onSelected={(id) => {
            onEditing(id);
            setIsEditing(false);
            setOptionId(id);
          }}
          items={
            [
              { title: "By Xpath (Recommended)", Id: 0 },
              { title: "By Css Selector", Id: 1 }
            ]
          } />
      ) : (
        <h3 className='tooltip-element' style={{border: '2px solid grey', padding:4, minWidth: 100, margin: 4, borderRadius: 6}} onClick={handleClick}>
          {ParseMethod[optionId].replace(/([A-Z])/g, ' $1').trim()}
          <span className="tooltip">{"Click to Change"}</span>
        </h3>
      )}
    </div>
  );
}

export default EditableOption