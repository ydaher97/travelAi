export function handleAttractionResponse(attractionResponse) {
    try {
        if (Array.isArray(attractionResponse)) {
            return [attractionResponse, ''];
          }
    //     console.log('after')
    const match = attractionResponse.match(/\[.*\]/s);
    console.log(match[0])
    if (match){
        console.log('match')
        if (Array.isArray(match[0])) {
            console.log('arr')

            return [match[0], ''];
          }
        
    }
    const responseObject = JSON.parse(attractionResponse);
    return [responseObject, ''];
    } catch (jsonError) {
        console.log('after1')

      // If parsing fails, try splitting based on '```json' (with three backticks)
      if (typeof attractionResponse === 'string') {
        const parts = attractionResponse.split('```json');
        // const parts2 = parts.split('```');

        const jsonObjects = [];
        let remainingString = '';
  
        parts.forEach((part, index) => {
          if (index > 0) {
            const endOfJson = part.indexOf('```');
            const jsonString = part.substring(0, endOfJson).trim();
  
            // Append the extracted JSON string to the result
            // remainingString += jsonString;
  
            try {
              // Parse the entire concatenated JSON string
            //   const parsedObject = JSON.parse(jsonString);
              jsonObjects.push(jsonString);
            } catch (parseError) {
              console.error(`Error parsing JSON part at index ${index}:`, parseError);
              console.error(`Problematic JSON string at index ${index}:`, jsonString);
            }
  
            // Reset remainingString for the next iteration
            remainingString = part.substring(endOfJson + 3);
          } else {
            remainingString += part;
          }
        });
  
        // Combine the results
        return [jsonObjects, remainingString.trim()];
      } else {
        return [[], ''];
      }
    }
  }
  