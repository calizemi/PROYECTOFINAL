import Sidebar from "../../components/Panel/sidebar/Sidebar";
import Navbar from "../../components/Panel/navbar/Navbar";
import "./panel.scss";
import Table from "../../components/Panel/table/Table";

const Panel = () => {
  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
        <div className="widgets">
        </div>
        <div className="charts">
        </div>
        <div className="listContainer">
          <div className="listTitle">Pedidos Realizados</div>
          <Table />
        </div>
      </div>
    </div>
  );
};

export default Panel;
