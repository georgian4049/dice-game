import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Input from "../../components/form/Input";
import { CamelCaseToString } from "../../utils/functions";
import "./styles/index.css";

const Table = ({
  data,
  columns,
  noContentsMessage,
  title,
  action,
  specialRowDesign,
}) => {
  const [state, setState] = useState([]);

  const handleSearch = (e) => {
    setState(data.filter((_data) => _data.userName.includes(e.target.value)));
  };
  useEffect(() => {
    setState(data);
  }, [data]);

  return (
    <>
      <div className="table-header">
        <div className="title">{title}</div>
        <div className="search">
          <Input placeholder="search" onChange={handleSearch} />
        </div>
      </div>
      <table>
        <thead>
          <tr id="table-header">
            {columns.map((column, index) => (
              <th
                key={index}
                style={{
                  width: `calc(100% / ${columns.length})`,
                }}
              >
                {CamelCaseToString(column)}{" "}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {state.length ? (
            state.map((_data, dataIndex) => (
              <tr
                key={dataIndex}
                style={specialRowDesign ? specialRowDesign(_data) : {}}
              >
                {columns.map((column, columnIndex) =>
                  action[column] && _data[column] ? (
                    action[column](_data[column])
                  ) : (
                    <td key={dataIndex + columnIndex}>
                      {_data[column]?.toString() || dataIndex + 1}
                    </td>
                  )
                )}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={columns.length} style={{ textAlign: "center" }}>
                {noContentsMessage}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  );
};

Table.propTypes = {
  data: PropTypes.array,
  column: PropTypes.array,
  noContentsMessage: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  title: PropTypes.string,
  action: PropTypes.object,
};

Table.defaultProps = {
  data: [],
  column: [],
  noContentsMessage: "No Content here",
  title: "Table Title",
  action: {},
};

export default Table;
