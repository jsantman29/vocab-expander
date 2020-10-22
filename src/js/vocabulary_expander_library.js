
/*  Counts the character in a given string. */
export const countCharacters = (string) => {
    try {
        const count = string.length;
        return count;
    } catch ( error ) {
        return 0;
    }
};

/*  Counts the words in a given string. */
export const countWords = (string) => {
    try {
        const regex = /[^\s]+/g;
        const words = string.match(regex);
        return words.length;
    } catch ( error ) {
        return 0;
    }
};

/* Strips punctuation from string, then contractions and possessives with an apostrophe, and return an array of words. */
export const getWords = (string) => {
    try {
        // const punctuationRe = /[.,\/#!$%\^&\*;:{}=\-_`~()?]/g;
        const wordRe = /[^\s]+/g;
        /* Strip punctuation from string. */
        // let stringWithoutPunctuation = string.replace(punctuationRe, "");
        /* Extract words from string. */
        let words = string.match(wordRe);
        return words;
    } catch (error) {
        return [];
    }
}

/*  Given an array of words, returns a word frequencies array.
    Example:
        words = ["hello", "hello", "foo"]
        wordFrequencies = [
            { 
                word: 'hello',
                count: 2,
            },
            {
                word: 'foo',
                count: 1,
            },
        ]
*/
export const getWordFrequencies = (words) => {
    const wordFrequencies = [];
    try {
        words.forEach((value) => {
            /* Checks if the value already exists in wordFrequencies and returns its index if so. */
            const index = wordFrequencies.findIndex((wordFrequency) => {
                return wordFrequency.word === value;
            });
            /* If the value exists, increment its count, else push it to the array. */
            if(index > -1) {
                wordFrequencies[index].count += 1; 
            }  else {
                wordFrequencies.push({word: value, count: 1});
            }
        });
 
    } catch (error) {
        // do nothing
    }
    return wordFrequencies;
};

export const sortWordFrequenciesByCount = (wordFrequencies, order) => {
    const lowercaseOrder = order.toLowerCase();
    const ascendingTokens = ['asc', 'ascending'];
    const descendingTokens = ['desc', 'descending'];
    let sortedWordFrequencies = [];

    if (ascendingTokens.indexOf(lowercaseOrder) > -1) {
        sortedWordFrequencies = wordFrequencies.sort((a, b) => {
            return a.count - b.count;
        });
        return sortedWordFrequencies;       
    } else if (descendingTokens.indexOf(lowercaseOrder) > -1) {
        sortedWordFrequencies = wordFrequencies.sort((a, b) => {
            return b.count - a.count;
        });
        return sortedWordFrequencies;
    } else {
        throw 'Error: Valid order not specified.';
    }
};

export const distributeArray = (array, numOfPartitions) => {
    const totalItems = array.length;
    const partitions = new Array(numOfPartitions);
    let currentPartitionIndex = 0;
    let currentItemIndex = 0;
    let currentItem;
    let currentPartition;
    
    // Initializes each partition as an array.
    for (let i = 0; i < numOfPartitions; i++) {
        partitions[i] = new Array();
    }

    // Evenly distributes the items of the original array into an array of partitions.
    for (currentItemIndex = 0; currentItemIndex < totalItems; currentItemIndex++) {
        currentItem = array[currentItemIndex];
        currentPartition = partitions[currentPartitionIndex];
        currentPartition.push(currentItem);
        currentPartitionIndex++;
        if (currentPartitionIndex >= numOfPartitions) {
            currentPartitionIndex = 0;
        }
    }

    return partitions;
};
