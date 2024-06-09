import { useState, useEffect } from "react";
import ParsedElement from "../../models/parsedElement";
import History from "../../services/History";
import XLSXConverter from "../../services/XLSXConverter";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faTable } from "@fortawesome/free-solid-svg-icons";


const HistoryMenuItem = ({ item }: { item: ParsedElement }) => (
  <div className="card">
    <h2 style={{ color: "#373A40" }}>{item.value}</h2>
    <p style={{ fontSize: "small", wordBreak: "break-all" }}>
      Website: <a 
        onClick={() => chrome.tabs.create({url: item.urlFrom})} 
        className="link">{item.urlFrom}</a>
    </p>
    <span className="meta">{item.date}</span>
  </div>
);

const HistoryMenu = () => {
  const history = History.Instance;
  const [historyItems, setHistoryItems] = useState<ParsedElement[]>([]);

  useEffect(() => {
    setHistoryItems(history.getHistory());
  }, []);

  const handleConvertToExcel = () => {
    if (historyItems.length > 0)
      XLSXConverter.convertParsedData(historyItems);
  };

  const handleClearHistory = () => {
    history.clearHistory();
    setHistoryItems([]);
  };

  return (
    <div>
      <div className="scrollable-container" style={{ border: "none", maxWidth: '380px' }}>
        {historyItems.length > 0 ? (
          historyItems.reverse().map((item, index) => (
            <HistoryMenuItem key={index} item={item} />
          ))
        ) : (
          <div className="container">
            <h1 style={{ color: "#56aaf9", textAlign: "center" }}>
              <FontAwesomeIcon color="grey" icon={faMagnifyingGlass}/>{" "}
              Oops, it seems you haven't tried to find anything yet
            </h1>
          </div>
        )}
      </div>
      <div className="button-group">
        <button className="button-outlined" onClick={handleConvertToExcel}>
          Excel <FontAwesomeIcon icon={faTable} />
        </button>
        <button onClick={handleClearHistory}>Clear</button>
      </div>
    </div>
  );
};

export default HistoryMenu;
