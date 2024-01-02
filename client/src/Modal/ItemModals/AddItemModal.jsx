/* eslint-disable react/prop-types */

function AddItemModal({ openPopup, setOpenPopup }) {
    return (
        <div className={`modal fade ${openPopup ? 'show' : ''}`} tabIndex="-1" role="dialog" style={{ display: openPopup ? 'block' : 'none' }} aria-hidden={!openPopup}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Add Item Modal</h5>
              <button type="button" className="btn-close" aria-label="Close" onClick={() => setOpenPopup(false)}></button>
            </div>
            <div className="modal-body">
              {/* Add your modal content here */}
              <p>This is the Add Item modal content.</p>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={() => setOpenPopup(false)}>Close</button>
              {/* Add additional modal action buttons if needed */}
            </div>
          </div>
        </div>
      </div>
    );
}

export default AddItemModal;
