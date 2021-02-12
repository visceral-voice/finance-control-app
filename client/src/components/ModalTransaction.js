import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import DatePicker from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';

Modal.setAppElement('#root');

export default function ModalTransaction({
  onSave,
  onClose,
  selectedTransaction,
  action,
}) {
  const [errorMessage, setErrorMessage] = useState('');
  const [tDescription, setTDescription] = useState('');
  const [tValue, setTValue] = useState('');
  const [tCategory, setTCategory] = useState('');
  const [tYearMonthDay, setTYearMonthDay] = useState('');
  const [tType, setTType] = useState('');
  const [valueTypeNegative, setValueTypeNegative] = useState('');
  const [valueTypePositive, setValueTypePositive] = useState('');
  const [id, setId] = useState('');

  useEffect(() => {
    if (!selectedTransaction) {
      setTDescription('');
      setTCategory('');
      setTValue(0);
      setTYearMonthDay(new Date());
      setTType('+');
    } else {
      const {
        _id,
        description,
        value,
        category,
        yearMonthDay,
        type,
      } = selectedTransaction;
      let parts = yearMonthDay.split('-');
      const yearMonthDayToDate = `${parts[1]}-${parts[2]}-${parts[0]}`;
      setTDescription(description);
      setTCategory(category);
      setTValue(value);
      setTYearMonthDay(yearMonthDayToDate);
      setTType(type);
      setId(_id);
    }
  }, []);

  useEffect(() => {
    if (tType === '-') {
      setValueTypeNegative(true);
      setValueTypePositive(false);
    } else {
      setValueTypeNegative(false);
      setValueTypePositive(true);
    }
  }, [tType]);

  const titleAction = action === 'edit' ? 'Edição' : 'Inclusão';

  function transformDate(yearMonthDay) {
    const day =
      yearMonthDay.getDate().length === 1
        ? '0' + yearMonthDay.getDate().toString()
        : yearMonthDay.getDate().toString();
    const month =
      yearMonthDay.getMonth().length === 1
        ? '0' + (yearMonthDay.getMonth() + 1).toString()
        : (yearMonthDay.getMonth() + 1).toString();

    const year = yearMonthDay.getFullYear().toString();

    return `${month}-${day}-${year}`;
  }

  const handleRadio = (event) => {
    if (event.currentTarget.id === 'typeNegative') {
      setTType('-');
    } else {
      setTType('+');
    }
  };

  const handleValueChange = (event) => {
    setTValue(event.currentTarget.value);
  };

  const handleCategoryChange = (event) => {
    setTCategory(event.currentTarget.value);
  };

  const handleDescriptionChange = (event) => {
    setTDescription(event.currentTarget.value);
  };

  const handleDateChanged = (event) => {
    setTYearMonthDay(transformDate(event));
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const parts = tYearMonthDay.split('-');
    const month =
      parts[0].length === 1 ? '0' + parts[0].toString() : parts[0].toString();
    const day =
      parts[1].length === 1 ? '0' + parts[1].toString() : parts[1].toString();

    let formData = {
      description: tDescription,
      value: tValue,
      category: tCategory,
      year: parts[2],
      month: parts[0],
      day: parts[1],
      yearMonth: `${parts[2]}-${month}`,
      yearMonthDay: `${parts[2]}-${month}-${day}`,
      type: tType,
    };

    if (action === 'edit') {
      formData = { _id: id, ...formData };
    }

    onSave(formData, action);
  };

  const handleModalClose = () => {
    onClose(null);
  };
  return (
    <div>
      <Modal isOpen={true} style={MODAL_STYLE}>
        <div>
          <div style={styles.flexRow}>
            <span style={styles.title}>{titleAction} de lançamento</span>
            <button
              className="waves-effect waves-lights btn red dark-4"
              onClick={handleModalClose}
            >
              X
            </button>
          </div>

          <form onSubmit={handleFormSubmit}>
            <div style={styles.flexRowIn}>
              <div style={styles.flexRowRadio}>
                <label>
                  <input
                    className="with-gap"
                    name="type"
                    id="typeNegative"
                    type="radio"
                    disabled={titleAction === 'Edição'}
                    checked={valueTypeNegative}
                    onChange={handleRadio}
                  />
                  <span>Despesa</span>
                </label>
                <label>
                  <input
                    className="with-gap"
                    name="type"
                    id="typePositive"
                    type="radio"
                    disabled={titleAction === 'Edição'}
                    checked={valueTypePositive}
                    onChange={handleRadio}
                  />
                  <span>Receita</span>
                </label>
              </div>
              <div className="input-field">
                <input
                  id="inputDescription"
                  type="text"
                  value={tDescription}
                  onChange={handleDescriptionChange}
                />
                <label className="active" htmlFor="inputDescription">
                  Descrição:
                </label>
              </div>
              <div className="input-field">
                <input
                  id="inputCategory"
                  type="text"
                  value={tCategory}
                  onChange={handleCategoryChange}
                />
                <label className="active" htmlFor="inputCategory">
                  Categoria:
                </label>
              </div>
              <div style={styles.flexRowValueDate}>
                <div className="row">
                  <div className="input-field col s6">
                    <input
                      id="inputValue"
                      type="text"
                      value={tValue}
                      onChange={handleValueChange}
                    />
                    <label className="active" htmlFor="inputValue">
                      Valor:
                    </label>
                  </div>
                </div>
                <div>
                  <div className="form-group">
                    <DatePicker
                      selected={new Date(tYearMonthDay)}
                      onChange={handleDateChanged}
                      name="dtYearMonthDay"
                      dateFormat="dd/MM/yyyy"
                      value={new Date(tYearMonthDay)}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div style={styles.flexRow}>
              <button
                className="waves-effect waves-light btn"
                disabled={errorMessage.trim() !== ''}
              >
                Salvar
              </button>
              <span style={styles.errorMessage}>{errorMessage}</span>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
}

const MODAL_STYLE = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    padding: 0,
    backgroundColor: 'rgba(20, 20, 20, 0.9)',
  },
  content: {
    height: '600px',
    width: '550px',
    margin: 'auto',
  },
};

const styles = {
  flexRow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: '10px',
  },

  flexRowRadio: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    margin: '10px 10px 25px 25px',
  },

  flexRowValueDate: {
    display: 'flex',
    flexDirection: 'row',
    alignContent: 'flex-start',
    border: '1px solid gray',
  },

  flexRowIn: {
    height: '400px',
    display: 'flex',
    flexDirection: 'column',
    paddingLeft: '10px',
    marginTop: '10px',
    marginBotton: '15px',
    paddingRight: '10px',
    border: '1px solid gray',
    borderRadius: '3px',
  },

  title: {
    fontSize: '1.3rem',
    fontWeight: 'bold',
  },

  errorMessage: {
    color: 'red',
    fontSize: '0.8rem',
    fontWeight: 'bold',
  },
};
