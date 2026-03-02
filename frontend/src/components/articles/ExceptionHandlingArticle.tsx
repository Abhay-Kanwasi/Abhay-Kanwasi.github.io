import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'

const sampleProgramString = `  # Program for Dividing two numbers.

  a = int(input("Enter a number :"))
  b = int(input("Enter a number :"))
  division = a/b
  print("Division of {0} and {1} is :".format(a, b), division)`

const tryExceptCodeString = `  # Program for Dividing two numbers.

  a = int(input("Enter a number :"))
  b = int(input("Enter a number :"))
  try:
    # In this block we are saying : Try this code to executed go to except block
    print(a/b)
  except Exception:
    # In this block you will handle it and say what to do if the error occurs
    print("You can't divide a number by zero")`

const finallyCodeString = `  # Program for Dividing two numbers.

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
    print("Resource Closed")`

function CodeBlock({ code }: { code: string }) {
  return (
    <div className="my-6 overflow-hidden rounded-lg border border-slate-700/60">
      <SyntaxHighlighter
        language="python"
        style={vscDarkPlus}
        showLineNumbers
        customStyle={{
          margin: 0,
          padding: '1.25rem',
          background: '#0b0f19',
          fontSize: '0.875rem',
          fontFamily: '"JetBrains Mono", "Fira Code", monospace',
        }}
      >
        {code}
      </SyntaxHighlighter>
    </div>
  )
}

export default function ExceptionHandlingArticle() {
  return (
    <article className="mx-auto max-w-3xl">
      <p className="mb-3 font-mono text-sm text-slate-600">19th July, 2024</p>

      <h1 className="mb-6 text-2xl font-bold tracking-tight text-slate-100 md:text-3xl">
        Exception Handling in Python
      </h1>

      <div className="mb-10 flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded bg-cyan-500/10 font-mono text-xs font-bold text-cyan-400">
          AK
        </div>
        <div>
          <p className="text-sm font-medium text-slate-200">Abhay Kanwasi</p>
          <a
            href="https://www.linkedin.com/in/abhay-kanwasi"
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-xs text-slate-500 transition-colors hover:text-cyan-400"
          >
            @abhay-kanwasi
          </a>
        </div>
      </div>

      <div className="space-y-5 text-sm leading-relaxed text-slate-300">
        <h2 className="text-lg font-bold text-slate-100">
          Now the first question is "What is an exception?"
        </h2>

        <p>
          If I put it in simple words: An exception is a scenario where the existing rules/laws
          don't work. So in that scenario we can say it is an exception.
        </p>

        <p>Now try to understand these things:</p>
        <ol className="list-inside list-decimal space-y-1 pl-2 text-slate-400">
          <li>Where does this exception come from?</li>
          <li>What is an exception in Python?</li>
          <li>How can we handle exceptions in Python?</li>
        </ol>

        <p>In Python we basically have 3 types of errors:</p>
        <ul className="list-inside list-disc space-y-1 pl-2 text-slate-400">
          <li>Compile Time Error</li>
          <li>Logical Error</li>
          <li>Runtime Error</li>
        </ul>

        <p>
          In Runtime error our code gets compiled, there is no syntactical error in it. But when
          user gives an unexpected input that causes an error.
        </p>

        <h2 className="pt-4 text-lg font-bold text-slate-100">
          2. What is an exception in Python?
        </h2>

        <p>For Example: If we write a code for Division of two numbers:</p>

        <CodeBlock code={sampleProgramString} />

        <p>
          In this code everything is alright till user enters 0, because you can't divide any
          number with 0 so in that scenario it gives you an error: (ZeroDivisionError). So in this
          scenario our code will get stuck. So we can say here is an exception. The main problem is
          Python follows procedural programming so if we get an error our process will be stuck. We
          don't want that. We want our error to resolve at that point and move to the next task. For
          that purpose we need to handle the exception in Python.
        </p>

        <h2 className="pt-4 text-lg font-bold text-slate-100">
          3. How can we handle exceptions in Python?
        </h2>

        <p>For handling exceptions in Python we have three things:</p>
        <ol className="list-inside list-decimal space-y-1 pl-2 text-slate-400">
          <li>
            <code className="rounded bg-slate-800 px-1.5 py-0.5 font-mono text-xs text-cyan-300">try</code>
          </li>
          <li>
            <code className="rounded bg-slate-800 px-1.5 py-0.5 font-mono text-xs text-cyan-300">except</code>
          </li>
          <li>
            <code className="rounded bg-slate-800 px-1.5 py-0.5 font-mono text-xs text-cyan-300">finally</code>
          </li>
        </ol>

        <p>Let's see how these work:</p>

        <p>
          1. In the try block, we put our division statement (Critical Statement) so Python tries to
          execute this code. In case the code doesn't work and gives an error, it raises an
          exception which we handle in the except block.
        </p>

        <p>
          2.{' '}
          <code className="rounded bg-slate-800 px-1.5 py-0.5 font-mono text-xs text-cyan-300">
            except Exception:
          </code>{' '}
          Here in this block, you can handle the exception. You can do anything (i.e.{' '}
          <em className="text-slate-400">
            print("Hey, You can't divide a number by zero man!")
          </em>
          )
        </p>

        <CodeBlock code={tryExceptCodeString} />

        <p>Now we handle the exception… All good!</p>

        <p>
          3. Now if you have a scenario where you open some resources and when you use them you must
          properly close them. But the question is where you close them? Inside the try block…
          or inside the except block… where?
        </p>

        <p>In this scenario we use finally…</p>

        <p>
          It doesn't matter for finally what executed (try block or except block). Its work is just
          to close the resources we opened earlier.
        </p>

        <CodeBlock code={finallyCodeString} />

        <p className="text-slate-500">Hope you get it...</p>
      </div>
    </article>
  )
}
