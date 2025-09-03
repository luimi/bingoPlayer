interface ComponentProps {
    sketch: number[][];
}
const GameModeMini: React.FC<ComponentProps> = ({sketch}) => {
    
   return (
      <div id="modes">
         <table>
            <tbody>
               {sketch.map((row, rowIndex) => (
                  <tr key={rowIndex}>
                     {row.map((cell, colIndex) => (
                        <td key={colIndex} className={`cell ${cell === 1 ? "selected" : ""}`}>
                        </td>
                     ))}
                  </tr>
               ))}
            </tbody>
         </table>
      </div>
   );
};

export default GameModeMini;