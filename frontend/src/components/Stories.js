import { Tab, Tabs } from 'react-bootstrap';

const Stories = () => {
  return (
    <>
      <div className="tabs-bar">
        <ul className="tabs-bar">
          <li className="tab active-tab">
            <button type="button">Active stories</button>
          </li>
          <li className="tab">Completed stories</li>
          <li className="tab">All stories</li>
  {/*        <li className="tabs-bar-button">+ New</li>*/}
        </ul>
      </div>
      <br />
      <Tabs id="stories-tabs" defaultActiveKey="active">
        <Tab eventKey="active" title="Active stories"></Tab>
        <Tab eventKey="completed" title="Completed stories"></Tab>
        <Tab eventKey="all" title="All stories"></Tab>
      </Tabs>
    </>
  );
}

export default Stories;