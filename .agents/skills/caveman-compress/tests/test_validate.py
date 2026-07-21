from pathlib import Path
import sys
import tempfile
import unittest

SCRIPTS_DIR = Path(__file__).resolve().parents[1] / "scripts"
sys.path.insert(0, str(SCRIPTS_DIR))

from validate import validate


class ValidateEncodingTests(unittest.TestCase):
    def test_marks_invalid_utf8_as_an_error(self):
        with tempfile.TemporaryDirectory() as temp_dir:
            root = Path(temp_dir)
            original = root / "original.md"
            compressed = root / "compressed.md"
            original.write_text("# Title\n", encoding="utf-8")
            compressed.write_bytes(b"# Title\n\xff")

            result = validate(original, compressed)

        self.assertFalse(result.is_valid)
        self.assertTrue(any("UTF-8" in error for error in result.errors))
        self.assertTrue(any(str(compressed) in error for error in result.errors))


if __name__ == "__main__":
    unittest.main()
