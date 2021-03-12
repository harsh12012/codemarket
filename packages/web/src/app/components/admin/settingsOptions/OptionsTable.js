import React from "react";
import { Table } from "react-bootstrap";
import { Trash, Edit2, ToggleLeft, ToggleRight } from "react-feather";

const FormOptionTable = ({
  oneData,
  handleDelete,
  handleEdit,
  handlePublish,
  disabled,
}) => {
  return oneData.options.length > 0 ? (
    <div className="mt-3">
      <Table bordered hover size="sm">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Status</th>
            <th className="text-center">Operations</th>
          </tr>
        </thead>
        <tbody>
          {oneData.options &&
            oneData.options.map((r, i) => (
              <tr>
                <td>{i + 1}</td>
                <td className="cursor-pointer" onClick={() => handlePreview(r)}>
                  {r.value}
                </td>
                <td>{r.published ? "Published" : "Unpublished"}</td>
                <td className="text-center">
                  <Edit2
                    onClick={() => handleEdit(i)}
                    className="mr-2 cursor-pointer"
                  />
                  <Trash
                    style={{
                      pointerEvents: disabled ? "none" : "auto",
                    }}
                    onClick={() => handleDelete(i)}
                    className="mr-2 cursor-pointer"
                  />
                  {r.published ? (
                    <ToggleRight
                      className="cursor-pointer"
                      style={{
                        pointerEvents: disabled ? "none" : "auto",
                      }}
                      onClick={() => handlePublish(i)}
                    />
                  ) : (
                    <ToggleLeft
                      className="cursor-pointer"
                      style={{
                        pointerEvents: disabled ? "none" : "auto",
                      }}
                      onClick={() => handlePublish(i)}
                    />
                  )}
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
    </div>
  ) : null;
};

export default FormOptionTable;
