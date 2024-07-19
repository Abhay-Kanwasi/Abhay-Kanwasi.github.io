import React from 'react';
import { Container, Typography, Box, Avatar, Link } from '@mui/material';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

const July_20_Article: React.FC = () => {
  const sampleProgramString = 
  `  # Program for Dividing two numbers.

  a = int(input("Enter a number :"))
  b = int(input("Enter a number :"))
  division = a/b
  print("Division of {0} and {1} is :".format(a, b), division)`;

  const tryExceptCodeString =  
  `  # Program for Dividing two numbers.

  a = int(input("Enter a number :"))
  b = int(input("Enter a number :"))s
  try:
    # In this block we are saying : Try this code to executed go to except block
    print(a/b)
  except Exception:
    # In this block you will handle it and say what to do if the error occurs
    print("You can't divide a number by zero")`;

  const finallycodeString = 
  `  # Program for Dividing two numbers.

  a = int(input("Enter a number :"))
  b = int(input("Enter a number :"))
  try:
    print("Resource Open")
    # In this block we are saying : Try this code to execute, if an error occurs go to except block
    print(a/b)
  except Exception:
    # In this block you will handle it and say what to do if the error occurs
    print("You can't divide a number by zero")
  finally:
    print("Resource Closed")`;

  return (
    <Container sx={{ paddingTop: '20px', width: '70%', mx: 'auto' }}>
      <Typography variant="body2" color="textSecondary" sx={{ marginBottom: '10px' }}>
        19th July, 2024
      </Typography>
      <Typography variant="h4" fontWeight="bold" sx={{ marginBottom: '20px' }}>
        Exception Handling in Python
      </Typography>
      <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
        <Avatar alt="Author" src="/path/to/avatar.jpg" sx={{ marginRight: '10px' }} />
        <Box>
            <Typography variant="body1" fontWeight="bold">
              Abhay Kanwasi
            </Typography>
            <Link href="https://www.linkedin.com/in/abhay-kanwasi" variant="body2" color="textSecondary">
              @abhay-kanwasi
            </Link>
        </Box>
      </Box>
      <Typography variant="h5" fontWeight="bold" sx={{ marginTop: '30px', marginBottom: '10px' }}>
          Now the first question is “What is an exception ?”
      </Typography>
      <Typography variant="body1" paragraph>
        If I put it in simple words : A exception is a scenario where the existing rules/laws doesn’t work. 
        So in that scenario we can say it is an exception.
        <br /><br />
        Now try to understand these things :-
        <br /><br />
        1. Where this exception come from ?
        <br />
        2. What is an exception in Python?
        <br />
        3. How we can handle exception in Python?
      </Typography>
      <Typography variant="body1" paragraph>
        In Python we basically have 3 types of errors..<br /><br />
        Compile Time Error<br />
        Logical Error<br />
        Runtime Error<br /><br />
        In Runtime error our code gets compiled, there is no syntactical error in it. But when user gives an unexpected input that causes an error.
      </Typography>
      <Typography variant="h6" fontWeight="bold" sx={{ marginTop: '20px', marginBottom: '10px' }}>
        2. What is an exception in Python?
      </Typography>
      <Typography variant="body1" paragraph>
        For Example: If we write a code for Division of two numbers<br />

        Code :
      </Typography>
      <Box
        sx={{
          backgroundColor: '#1e1e1e',
          borderRadius: '8px',
          overflow: 'hidden',
          padding: '20px',
          fontFamily: 'monospace',
          color: 'white',
        }}
      >
        <Box component="pre" sx={{ margin: 0 }}>
          <Box component="code">
          <SyntaxHighlighter language="python" style={vscDarkPlus} showLineNumbers>
            {sampleProgramString}
          </SyntaxHighlighter>
          </Box>
        </Box>
      </Box>
      <Typography variant="body1" paragraph paddingTop={'10px'}>
        In this code everything is alright till user enters 0, because you can’t divide any number with 0 so in that scenario it gives you an error : (ZeroDivisionError) So in this scenario our code will stuck. So we can say here is an exception. The main problem is Python follows procedural programming so if we get an error our process will be stuck.. We don’t want that. We want our error to resolve at the point and move to next task. For that purpose we need to handle the exception in Python.
      </Typography>
      <Typography variant="h6" fontWeight="bold" sx={{ marginTop: '20px', marginBottom: '10px' }}>
        3. How we can handle exception in Python?
      </Typography>
      <Typography variant="body1" paragraph>
        For handling exception in Python we have three things :<br />
        &nbsp;&nbsp;&nbsp;&nbsp;1. try<br />
        &nbsp;&nbsp;&nbsp;&nbsp;2. except<br />
        &nbsp;&nbsp;&nbsp;&nbsp;3. finally<br />
        Let’s see how these work..<br /><br />
        1. In the try block, we put our division statement (Critical Statement) so Python tries to execute this code. In case the code doesn’t work and gives an error, it raises an exception which we handle in the except block..<br />
        2. “except Exception:” Here in this block, you can handle the exception. You can do anything (i.e. <em>print(“Hey, You can’t divide a number by zero man!”)</em>)
      </Typography>
      <Box
        sx={{
          backgroundColor: '#1e1e1e',
          borderRadius: '8px',
          overflow: 'hidden',
          padding: '20px',
          fontFamily: 'monospace',
          color: 'white',
        }}
      >
        <Box component="pre" sx={{ margin: 0 }}>
          <Box component="code">
          <SyntaxHighlighter language="python" style={vscDarkPlus} showLineNumbers>
            {tryExceptCodeString}
          </SyntaxHighlighter>
          </Box>
        </Box>
      </Box>
      <Typography variant="body1" paragraph paddingTop="10px">
        Now we handle the exception… All good!<br /><br />
        
        3. Now if you have a scenario where you open some resources and when you use them you must properly close them. But the question is where you close them? “inside the try block… or inside the except block… where?”<br /><br />
        
        In this scenario we use finally…<br /><br />
        
        It doesn’t matter for finally what executed (try block or except block). Its work is just to close the resources we opened earlier..
      </Typography>
      <Box
        sx={{
          backgroundColor: '#1e1e1e',
          borderRadius: '8px',
          overflow: 'hidden',
          padding: '20px',
          fontFamily: 'monospace',
          color: 'white',
        }}
      >
        <SyntaxHighlighter language="python" style={vscDarkPlus} showLineNumbers>
          {finallycodeString}
        </SyntaxHighlighter>
      </Box>
      <Typography variant="body1" paragraph paddingTop={'10px'}>
        Hope you get it...
      </Typography>
    </Container>
  );
}

export default July_20_Article;
