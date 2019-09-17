# cmpr-cli
Compare two numbers in CLI

## Usage

```bash
> cmpr gt 3 2 # no output because 3 ig great that 3

> cmpr gt 2 3 
Error: 2 is not great than 3 # Error output and exit code is 1. Because 2 is not great that 3

> cmpr lt 3 2
Error: 3 is not less than 2

> cmpr lte 3 3 # No output and exit code is 0. Because 3 is less than ot equal 3

> cmpr gte 5 3 
```
