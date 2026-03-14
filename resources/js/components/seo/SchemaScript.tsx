import React from 'react';
import generateSchemaMarkup, { SchemaMarkupProps } from './SchemaMarkup';

interface SchemaScriptProps {
  schema: SchemaMarkupProps;
}

// Component to add Schema.org markup to the page
const SchemaScript: React.FC<SchemaScriptProps> = ({ schema }) => {
  const schemaJson = generateSchemaMarkup(schema);
  
  return (
    <script 
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: schemaJson }}
    />
  );
};

export default SchemaScript;
