import React from "react";
import { Table } from "react-bootstrap";
import { Trash, Edit2, ToggleLeft, ToggleRight } from "react-feather";

const FormOptionTable = ({
  allData,
  handleDelete,
  handleEdit,
  handlePublish,
  disabled,
  handlePreview,
}) => {
  return allData.length > 0 ? (
    <div className="mt-3">
      <Table bordered hover size="sm">
        <thead>
          <tr>
            <th>#</th>
            <th>Title</th>
            <th>Form Name</th>
            <th>Status</th>
            <th className="text-center">Operations</th>
          </tr>
        </thead>
        <tbody>
          {allData &&
            allData.map((r, i) => (
              <tr>
                <td>{i + 1}</td>
                <td className="cursor-pointer" onClick={() => handlePreview(r)}>
                  {r.title}
                </td>
                <td>{r.formName}</td>
                <td>{r.published ? "Published" : "Unpublished"}</td>
                <td className="text-center">
                  <Edit2
                    style={{ cursor: "pointer" }}
                    onClick={() => handleEdit(r)}
                    className="mr-2"
                  />
                  <Trash
                    style={{
                      cursor: "pointer",
                      pointerEvents: disabled ? "none" : "auto",
                    }}
                    onClick={() => handleDelete(r._id)}
                    className="mr-2"
                  />
                  {r.published ? (
                    <ToggleRight
                      style={{
                        cursor: "pointer",
                        pointerEvents: disabled ? "none" : "auto",
                      }}
                      onClick={() =>
                        handlePublish({
                          published: !r.published,
                          id: r._id,
                        })
                      }
                    />
                  ) : (
                    <ToggleLeft
                      style={{
                        cursor: "pointer",
                        pointerEvents: disabled ? "none" : "auto",
                      }}
                      onClick={() =>
                        handlePublish({
                          published: !r.published,
                          id: r._id,
                        })
                      }
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
