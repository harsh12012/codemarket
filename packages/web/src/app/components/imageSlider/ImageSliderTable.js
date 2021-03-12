import React from "react";
import { Table } from "react-bootstrap";
import { Trash, Edit2, ToggleLeft, ToggleRight } from "react-feather";

const ImageSliderTable = ({
  allRooms,
  handleDelete,
  handleEdit,
  handlePublish,
  disabled,
}) => {
  return allRooms.length > 0 ? (
    <div className="mt-3">
      <Table bordered hover size="sm">
        <thead>
          <tr>
            <th>#</th>
            <th>Title</th>
            <th>Price</th>
            <th>Status</th>
            <th className="text-center">Operations</th>
          </tr>
        </thead>
        <tbody>
          {allRooms &&
            allRooms.map((r, i) => (
              <tr>
                <td>{i + 1}</td>
                <td>
                  <a
                    target="_blank"
                    href={
                      r.published
                        ? `${
                            process.env.PUBLIC_URL + "/admin/slider/" + r.slug
                          }`
                        : `${
                            process.env.PUBLIC_URL + "/admin/slider/" + r.slug
                          }`
                    }
                  >
                    {r.title}
                  </a>{" "}
                </td>
                <td>${r.title}</td>
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

export default ImageSliderTable;
