import { Tab, Tabs } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';

const Stories = () => {
  return (
    <>
      <div className="tabs-bar">
        <div className="tab active-tab">Active stories</div>
        <div className="tab">Completed stories</div>
        <div className="tab">All stories</div>
        <div className="tabs-bar-button">+ New</div>
      </div>
    </>
  );
}

export default Stories;