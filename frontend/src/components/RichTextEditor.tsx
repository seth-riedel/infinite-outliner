import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Placeholder from '@tiptap/extension-placeholder'
import Highlight from '@tiptap/extension-highlight'
import TextAlign from '@tiptap/extension-text-align'
import Link from '@tiptap/extension-link'
import Image from '@tiptap/extension-image'
import TaskList from '@tiptap/extension-task-list'
import TaskItem from '@tiptap/extension-task-item'
import {
  Box,
  Paper,
  ToggleButton,
  ToggleButtonGroup,
  IconButton,
  Divider,
  Tooltip,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button
} from '@mui/material'
import {
  FormatBold,
  FormatItalic,
  FormatStrikethrough,
  FormatListBulleted,
  FormatListNumbered,
  FormatAlignLeft,
  FormatAlignCenter,
  FormatAlignRight,
  FormatAlignJustify,
  Link as LinkIcon,
  Image as ImageIcon,
  CheckBox,
  Highlight as HighlightIcon,
  Code,
  FormatQuote
} from '@mui/icons-material'
import { useState } from 'react'

interface RichTextEditorProps {
  content?: string
  onChange?: (content: string) => void
  placeholder?: string
}

const RichTextEditor = ({ content = '', onChange, placeholder = 'Start writing...' }: RichTextEditorProps) => {
  const [linkDialogOpen, setLinkDialogOpen] = useState(false)
  const [linkUrl, setLinkUrl] = useState('')
  const [imageDialogOpen, setImageDialogOpen] = useState(false)
  const [imageUrl, setImageUrl] = useState('')

  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder,
      }),
      Highlight,
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: 'link',
        },
      }),
      Image,
      TaskList,
      TaskItem.configure({
        nested: true,
      }),
    ],
    content,
    onUpdate: ({ editor }) => {
      onChange?.(editor.getHTML())
    },
    editorProps: {
      attributes: {
        class: 'prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto focus:outline-none',
      },
    },
  })

  if (!editor) {
    return null
  }

  const addLink = () => {
    if (linkUrl) {
      editor.chain().focus().extendMarkRange('link').setLink({ href: linkUrl }).run()
      setLinkUrl('')
      setLinkDialogOpen(false)
    }
  }

  const addImage = () => {
    if (imageUrl) {
      editor.chain().focus().setImage({ src: imageUrl }).run()
      setImageUrl('')
      setImageDialogOpen(false)
    }
  }

  return (
    <Box sx={{ width: '100%' }}>
      {/* Toolbar */}
      <Paper 
        elevation={1} 
        sx={{ 
          p: 1, 
          mb: 2, 
          display: 'flex', 
          flexWrap: 'wrap', 
          gap: 0.5,
          alignItems: 'center'
        }}
      >
        {/* Text Formatting */}
        <ToggleButtonGroup size="small" value="" exclusive>
          <Tooltip title="Bold (Ctrl+B)">
            <ToggleButton
              value="bold"
              selected={editor.isActive('bold')}
              onClick={() => editor.chain().focus().toggleBold().run()}
            >
              <FormatBold />
            </ToggleButton>
          </Tooltip>
          <Tooltip title="Italic (Ctrl+I)">
            <ToggleButton
              value="italic"
              selected={editor.isActive('italic')}
              onClick={() => editor.chain().focus().toggleItalic().run()}
            >
              <FormatItalic />
            </ToggleButton>
          </Tooltip>
          <Tooltip title="Strikethrough">
            <ToggleButton
              value="strike"
              selected={editor.isActive('strike')}
              onClick={() => editor.chain().focus().toggleStrike().run()}
            >
              <FormatStrikethrough />
            </ToggleButton>
          </Tooltip>
          <Tooltip title="Highlight">
            <ToggleButton
              value="highlight"
              selected={editor.isActive('highlight')}
              onClick={() => editor.chain().focus().toggleHighlight().run()}
            >
              <HighlightIcon />
            </ToggleButton>
          </Tooltip>
        </ToggleButtonGroup>

        <Divider orientation="vertical" flexItem />

        {/* Headings */}
        <ToggleButtonGroup size="small" value="" exclusive>
          <Tooltip title="Heading 1">
            <ToggleButton
              value="h1"
              selected={editor.isActive('heading', { level: 1 })}
              onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
            >
              H1
            </ToggleButton>
          </Tooltip>
          <Tooltip title="Heading 2">
            <ToggleButton
              value="h2"
              selected={editor.isActive('heading', { level: 2 })}
              onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
            >
              H2
            </ToggleButton>
          </Tooltip>
          <Tooltip title="Heading 3">
            <ToggleButton
              value="h3"
              selected={editor.isActive('heading', { level: 3 })}
              onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
            >
              H3
            </ToggleButton>
          </Tooltip>
        </ToggleButtonGroup>

        <Divider orientation="vertical" flexItem />

        {/* Lists */}
        <ToggleButtonGroup size="small" value="" exclusive>
          <Tooltip title="Bullet List">
            <ToggleButton
              value="bulletList"
              selected={editor.isActive('bulletList')}
              onClick={() => editor.chain().focus().toggleBulletList().run()}
            >
              <FormatListBulleted />
            </ToggleButton>
          </Tooltip>
          <Tooltip title="Numbered List">
            <ToggleButton
              value="orderedList"
              selected={editor.isActive('orderedList')}
              onClick={() => editor.chain().focus().toggleOrderedList().run()}
            >
              <FormatListNumbered />
            </ToggleButton>
          </Tooltip>
          <Tooltip title="Task List">
            <ToggleButton
              value="taskList"
              selected={editor.isActive('taskList')}
              onClick={() => editor.chain().focus().toggleTaskList().run()}
            >
              <CheckBox />
            </ToggleButton>
          </Tooltip>
        </ToggleButtonGroup>

        <Divider orientation="vertical" flexItem />

        {/* Alignment */}
        <ToggleButtonGroup size="small" value="" exclusive>
          <Tooltip title="Align Left">
            <ToggleButton
              value="left"
              selected={editor.isActive({ textAlign: 'left' })}
              onClick={() => editor.chain().focus().setTextAlign('left').run()}
            >
              <FormatAlignLeft />
            </ToggleButton>
          </Tooltip>
          <Tooltip title="Align Center">
            <ToggleButton
              value="center"
              selected={editor.isActive({ textAlign: 'center' })}
              onClick={() => editor.chain().focus().setTextAlign('center').run()}
            >
              <FormatAlignCenter />
            </ToggleButton>
          </Tooltip>
          <Tooltip title="Align Right">
            <ToggleButton
              value="right"
              selected={editor.isActive({ textAlign: 'right' })}
              onClick={() => editor.chain().focus().setTextAlign('right').run()}
            >
              <FormatAlignRight />
            </ToggleButton>
          </Tooltip>
          <Tooltip title="Justify">
            <ToggleButton
              value="justify"
              selected={editor.isActive({ textAlign: 'justify' })}
              onClick={() => editor.chain().focus().setTextAlign('justify').run()}
            >
              <FormatAlignJustify />
            </ToggleButton>
          </Tooltip>
        </ToggleButtonGroup>

        <Divider orientation="vertical" flexItem />

        {/* Other */}
        <ToggleButtonGroup size="small" value="" exclusive>
          <Tooltip title="Blockquote">
            <ToggleButton
              value="blockquote"
              selected={editor.isActive('blockquote')}
              onClick={() => editor.chain().focus().toggleBlockquote().run()}
            >
              <FormatQuote />
            </ToggleButton>
          </Tooltip>
          <Tooltip title="Code Block">
            <ToggleButton
              value="codeBlock"
              selected={editor.isActive('codeBlock')}
              onClick={() => editor.chain().focus().toggleCodeBlock().run()}
            >
              <Code />
            </ToggleButton>
          </Tooltip>
        </ToggleButtonGroup>

        <Divider orientation="vertical" flexItem />

        {/* Links and Images */}
        <Tooltip title="Add Link">
          <IconButton
            size="small"
            onClick={() => setLinkDialogOpen(true)}
            color={editor.isActive('link') ? 'primary' : 'default'}
          >
            <LinkIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Add Image">
          <IconButton
            size="small"
            onClick={() => setImageDialogOpen(true)}
          >
            <ImageIcon />
          </IconButton>
        </Tooltip>
      </Paper>

      {/* Editor Content */}
      <Paper 
        elevation={1} 
        sx={{ 
          minHeight: '400px', 
          p: 2,
          '& .ProseMirror': {
            outline: 'none',
            minHeight: '400px',
            '& p': {
              margin: '0.5em 0',
            },
            '& h1, & h2, & h3, & h4, & h5, & h6': {
              margin: '1em 0 0.5em 0',
            },
            '& ul, & ol': {
              paddingLeft: '1.5em',
            },
            '& blockquote': {
              borderLeft: '3px solid #ddd',
              margin: '1em 0',
              paddingLeft: '1em',
              fontStyle: 'italic',
            },
            '& code': {
              backgroundColor: '#f5f5f5',
              padding: '0.2em 0.4em',
              borderRadius: '3px',
              fontFamily: 'monospace',
            },
            '& pre': {
              backgroundColor: '#f5f5f5',
              padding: '1em',
              borderRadius: '4px',
              overflow: 'auto',
            },
            '& .link': {
              color: '#1976d2',
              textDecoration: 'underline',
            },
            '& .highlight': {
              backgroundColor: '#fff3cd',
            },
          }
        }}
      >
        <EditorContent editor={editor} />
      </Paper>

      {/* Link Dialog */}
      <Dialog open={linkDialogOpen} onClose={() => setLinkDialogOpen(false)}>
        <DialogTitle>Add Link</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="URL"
            type="url"
            fullWidth
            variant="outlined"
            value={linkUrl}
            onChange={(e) => setLinkUrl(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && addLink()}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setLinkDialogOpen(false)}>Cancel</Button>
          <Button onClick={addLink} variant="contained">Add</Button>
        </DialogActions>
      </Dialog>

      {/* Image Dialog */}
      <Dialog open={imageDialogOpen} onClose={() => setImageDialogOpen(false)}>
        <DialogTitle>Add Image</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Image URL"
            type="url"
            fullWidth
            variant="outlined"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && addImage()}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setImageDialogOpen(false)}>Cancel</Button>
          <Button onClick={addImage} variant="contained">Add</Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}

export default RichTextEditor 