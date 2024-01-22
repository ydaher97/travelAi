import React from 'react'

const BudgetBreackdown = ({totalCost}) => {
  return (
    <div>
      <p>Budget breakdown: ${totalCost} In total</p>
      <p>Activities & Food:
          $94
          Transport:
          $3</p>
    </div>
  )
}

export default BudgetBreackdown