import { useBingoContext } from '../../contexts/BingoContext';
interface ComponentProps { }
const NumberBoardMini: React.FC<ComponentProps> = () => {
  const { numbers } = useBingoContext()
  const generateTable = () => {
    const table = [];
    const row = 5;
    const columns = 15;
    let counter = 1;

    for (let i = 0; i < row; i++) {
      const cols = [];
      for (let j = 0; j < columns; j++) {
        cols.push(<td key={`col-${i}-${j}`} className={`${numbers.includes(counter) ? 'selected' : ''}`}>{counter}</td>);
        counter++;
      }
      table.push(<tr key={`row-${i}`}>
        <th>{['B','I','N','G','O'][i]}</th>
        {cols}
        </tr>);
    }
    return (
      <table id="board" className='w100'>
        <tbody>{table}</tbody>
      </table>
    );
  };
  return (
    <div>
      {generateTable()}
    </div>

  );
};

export default NumberBoardMini;